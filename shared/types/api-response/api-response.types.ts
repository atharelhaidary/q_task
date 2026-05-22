import { Types } from "mongoose";
import { TLoginMeta, TPagination, TPaginationMeta } from "..";

export type TApiResponse<T = any> = {
    success?: boolean;
    status?: number;
    message?: string;
    accessToken?:{
        id: string; 
        expiresAt: Date;
    };
    refreshToken?: {
        id: string;
        expiresAt: Date;
    }
    tempToken?:{
        id?: Types.ObjectId,
        expiresAt?: Date
    }
    data?: T;
    meta?: TLoginMeta | TPaginationMeta;
    pagination?: TPagination,
}
  