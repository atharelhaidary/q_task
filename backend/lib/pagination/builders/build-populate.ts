const addPopulate = (pop) => {
    const popOptions: any = {
        path: pop.path ,
   };
   if (pop.select) {
       popOptions.select = pop.select
   }
   if (pop.match) {
       popOptions.match = pop.match;
   }
   if (pop.populate) {
       popOptions.populate = addPopulate(pop.populate)
   }
   if(pop.options){
       popOptions.options = pop.options
   }
   return popOptions;
}



export const buildPopulate = (query, populate) => {
    if (populate && populate.length > 0) {
        populate.forEach((pop: any) => {
            const popResult = addPopulate(pop)
            query = query.populate(popResult);
        });
    }
    return query
}

