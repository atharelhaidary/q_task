export type TPagination = {
    currentPage : number;
    totalItems : number;
    totalPages : number;
    itemsPerPage : number ;
    hasNextPage : boolean;
    hasPrevPage: boolean;
    nextPage: number | null,
    prevPage: number | null,
}