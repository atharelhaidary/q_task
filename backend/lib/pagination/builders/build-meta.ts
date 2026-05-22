export const buildMeta = (search : string , searchFields : string[], filters :Record<string,any>, sorting:any ) => {
    const hasSearch = !!search && search.trim() !== '';
    return {
            search: {
                active: hasSearch ?  true : false,
                details: hasSearch ? {
                    term: search,
                    fields: searchFields,
                } : {
                    reason: 'No search parameter provided',
                    availableFields: searchFields,
                }
            },
            sorting: sorting?.map((sort)=> ({
                by: sort.sortBy,
                order: Number(sort.sortOrder)
            })),
            filters: Object.keys(filters).length > 0 ? {
                active: true,
                count: Object.keys(filters).length,
                list: { ...filters }
            } : {
                active: false,
                message: 'No filters applied'
            },
            
            timestamp: new Date().toISOString()
    }
}