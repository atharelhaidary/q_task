

export type  { TPaginationMeta } from "./meta/pagination-meta";
export type  { TPagination } from "./pagination/pagination.types";
export type  { ITask } from "./task.types";
export type  { TApiResponse } from "./api-response/api-response.types";
export type  { TLoginMeta } from "./meta/login-meta";
export type TInvalidateQueries<T> =  (string | Record<string, any>)[][] | ((data: T) => (string | Record<string, any>)[][]);