import { TApiResponse } from "@/shared/types";
import { NextResponse } from "next/server";

export  function generateNextResponse<T>({success,status,message,data, accessToken, refreshToken,tempToken,meta,pagination}:TApiResponse):NextResponse<TApiResponse<T>> {
    const response : TApiResponse<T> = {
        success,
        status,
        message,
        ...(refreshToken && { refreshToken }),
        ...(accessToken && { accessToken }),
        ...(tempToken && {tempToken }),
        ...(data && { data }),
        ...(meta && { meta }),
        ...(pagination && { pagination }),
    }
    return NextResponse.json(response, { status: status })
}

