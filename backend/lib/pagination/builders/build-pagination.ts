export const buildPagination = (actualPage:number,totalItems:number, totalPages:number,validLimit:number, validPage:number) => {
    const hasNextPage = actualPage < totalPages;
    const hasPrevPage = actualPage > 1;
    return {
            currentPage : actualPage,
            totalItems,
            totalPages,
            itemsPerPage : validLimit,
            hasNextPage: validPage < totalPages,
            hasPrevPage : validPage > 1,
            nextPage: hasNextPage ? validPage + 1 : null,
            prevPage: hasPrevPage ? validPage - 1 : null
    }
}
export const buildEmptyPagination = (validPage:number,validLimit:number) => {
    return {
        currentPage: validPage,
        totalItems: 0,
        totalPages: 0,
        itemsPerPage: validLimit,
        hasNextPage: false,
        hasPrevPage: false,
        nextPage: null,
        prevPage: null
    }
}