import { TPagination, TPaginationMeta } from "@/shared/types";

export  type TPaginationParams = {
    page?: number;
    limit?: number;
    search?: string;
    sorting?: {
        sortBy?: string;
        sortOrder?: number;
    }[]
    [key: string]: any; 
};
export type TPopulate  = {
    path : string,
    fields?: string[],
    match ?: any
    populate?: TPopulate | TPopulate[]
    select ?: string,
    options?: any;

}
export type TPaginationOptions<T>= {
    searchFields?: string | string[];
    selectFields?: string;
    populate?:TPopulate[]
    lean?: boolean;
    deleted? : boolean;
    subDocumentKeys ?: {
        subKey: string,
        nestedKey ?: string[] | string
        filterField ? : string
        filterValue : boolean
    }[]
}

export type TPaginationResponse<T> = {
    message: string;
    data: T[];
    pagination : TPagination ;
    meta : TPaginationMeta;
    status: number;
    hasSearchQuery ?:boolean;
    isEmptySystem ?: boolean
}