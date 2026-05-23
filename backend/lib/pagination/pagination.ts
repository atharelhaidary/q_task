import mongoose, { Model } from 'mongoose';
import { TPaginationParams, TPaginationResponse, TPaginationOptions } from "./pagination.type";
import { buildMeta, buildBaseQuery, buildPagination, buildEmptyPagination, buildPopulate } from './index'
import { getAllKeys } from '../get-all-keys';
import { getCollectionName } from './collection-name';

export async function pagination<T>(
    model: Model<T>,
    params: TPaginationParams = {},
    options: TPaginationOptions<T> = {}
): Promise<TPaginationResponse<T>> {

    const { page = 1, limit = 5, search = '', pagination = true , sorting = [], ...filters } = params;
    const { searchFields = [], populate, lean = true, deleted } = options;    

    let allSearchFields: string[];
    if (searchFields === "all") {
        allSearchFields = Object.keys(model.schema.paths);
    } else if (Array.isArray(searchFields)) {
        allSearchFields = searchFields;
    } else {
        allSearchFields = [];
    }
    
    const allFilters = {
        ...filters,
        ...(deleted === true ? { isDeleted: false } : {})
    };
    
    const allKeys = getAllKeys(model.schema);
    const validPage = Math.max(1, page);
    const validLimit = Math.min(Math.max(1, limit), 100);
    const hasSearch = !!search && search.trim() !== '';
    const hasFilters = Object.keys(allFilters).length > 0;
    const newSorting = [{sortBy:'createdAt', sortOrder :-1 }, ...sorting]
    const meta = buildMeta(search, allSearchFields, allFilters, newSorting);
    const baseQuery = buildBaseQuery(search, allSearchFields, allFilters);
    const emptyPagination = buildEmptyPagination(validPage, validLimit);
    
    const mainFilters: any = {};
    const populateFilters: any = {};
    // add normal filters to mainFilters;
    //add populate filters to populateFilters;
    Object.entries(baseQuery).forEach(([key, value]) => {
        if (!allKeys.includes(key) && key !== '$or' && key !== '$and' ) {
            if (key.includes('_id')) {
                populateFilters[key] = new mongoose.Types.ObjectId(value as string);
            } 
            else if (key.includes("sorting")){
                const match = key.match(/sorting\[(\d+)\]\[(\w+)\]/);
                if (match) {
                    const index = parseInt(match[1]);
                    const field = match[2];
                            if (!newSorting[index]) newSorting[index] = {} as any;
                            newSorting[index][field] = value;
                        } 
            }else{
                populateFilters[key] = value
            }
        } else {
                if (key.includes('_id')) {
                    mainFilters[key] = new mongoose.Types.ObjectId(value as string);
                } 
                mainFilters[key] = value;
        }
    });

    //add populateFilters to mainFilters
    if (populateFilters && Object.keys(populateFilters).length > 0) {
        for (const [filterKey, filterValue] of Object.entries(populateFilters)) {
            const parts = filterKey.split('.');
            const topLevelPath = parts[0];
            const nestedPath = parts.slice(1).join('.');
            
            const RelatedModel = mongoose.model(getCollectionName(topLevelPath));
            const matchedIds = await RelatedModel.find({ [nestedPath]: filterValue }).distinct('_id');
            
            if (mainFilters[topLevelPath]) {
                mainFilters['$and'] = mainFilters['$and'] || [];
                mainFilters['$and'].push({ [topLevelPath]: { $in: matchedIds } });
            } else {
                mainFilters[topLevelPath] = { $in: matchedIds };
            }
            
            // لو مفيش IDs مطابقة، ارجع فاضي
            if (matchedIds.length === 0) {
                mainFilters[topLevelPath] = { $in: [] };
                break; 
            }
        }
    }
  
    // get data
    let query = model.find(mainFilters);
    // ✅make populate
    if (populate && populate.length > 0) {
        query = buildPopulate(query,populate)
    }

    // ✅ Count total
    const totalItems = await model.countDocuments(mainFilters);
    const totalPages = Math.ceil(totalItems / validLimit);
    
    if (totalItems === 0 && (hasSearch || hasFilters)) {
        return {
            status: 200,
            message: "No results found",
            data: [],
            pagination: emptyPagination,
            meta: meta,
            hasSearchQuery: true,
        };
    }
    
    if (totalItems === 0 && !hasSearch && !hasFilters) {
        return {
            status: 200,
            message: 'No data available yet',
            data: [],
            pagination: emptyPagination,
            meta: meta,
            isEmptySystem: true,
        };
    }
    // ✅ أضف sorting
    const sortOptions: any = {};
    newSorting?.forEach((sort)=>{
        sortOptions[sort.sortBy] = Number(sort.sortOrder) 
    })
    query = query.sort(sortOptions);  
    let  paginationResult;
    // ✅ أضف pagination
    if(JSON.parse(pagination) ===  true ){
        const actualPage = Math.min(validPage, totalPages);
        const skip = (actualPage - 1) * validLimit;
        query = query.skip(skip).limit(validLimit);
        paginationResult = buildPagination(actualPage, totalItems, totalPages, validLimit, validPage);
    }else if(JSON.parse(pagination) === false){
        paginationResult = buildPagination( 1, totalItems, 0, 0, 0 );
    }
    // ✅ apply populate filters
    let data = await query.lean();
    return {
        status: 200,
        message: data.length ? 'data fetched successfully' : 'No results found',
        data: data as T[],
        pagination: paginationResult,
        meta
    };
}








