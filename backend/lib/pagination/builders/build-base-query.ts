import mongoose from "mongoose";
export const buildBaseQuery = (  search : string , searchFields : string[], filters :Record<string,any>) => {
    let baseQuery: any = {};
    const processedFilters: any = {};
    const hasSearch = !!search && search.trim() !== '';
    const hasFilters = Object.keys(filters).length > 0
    const { type, ...restFilters } = filters;
    Object.entries(restFilters).forEach(([key, value]) => {
        if (value === "true") {
            processedFilters[key] = true;
        } else if (value === "false") {
            processedFilters[key] = false;
        } else if(type === "id" && typeof value === 'string' && value.startsWith('[')){
            try{
                 const ids = JSON.parse(value).map((id)=> new mongoose.Types.ObjectId(id))
                 processedFilters[key] = {$in : ids}
            }catch(error) {}

        }else if(key === "_id"){
            processedFilters[key] = new mongoose.Types.ObjectId(value as string);
        }else {
            processedFilters[key] = value;
        }
    });
    //has search
    if (hasSearch && searchFields.length > 0) {
        const searchConditions = searchFields.map(field => ({
            [field]: { $regex: search.trim(), $options: 'i' }
        }));
        
        if (hasFilters) {
            baseQuery = {
                $and: [
                    processedFilters,
                    { $or: searchConditions }
                ]
            };
        } else {
            baseQuery = { $or: searchConditions };
        }
    } else if (hasFilters) {
        baseQuery = processedFilters;
    }
    return baseQuery;
}
