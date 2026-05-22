import { parseBody } from "./parsers/parse-body";
import { isEmptyBody } from "./validators/is-empty-body";
import { formatZodErrors } from "./formatters/zod-error-formatter";
import { NextRequest } from "next/server";
import z from "zod";
import { TApiResponse } from "@/shared/types";



export async function validateRequest<TRequest=any>(request : NextRequest, schema? : z.ZodType<TRequest> | z.ZodObject) : Promise<TApiResponse> {
    
    //parse body
    const body  = await parseBody<TRequest>(request)  as TRequest
    const emptyBody = isEmptyBody(body);
    // check the body is empty
    if(emptyBody){
        return {
            status: 400,
            message: "Request body cannot be empty. Please provide valid data.",
            success:false
        }
    }
    //check validation
    const result = schema.safeParse(body);
    if (!result.success) {
        const formattedErrors = formatZodErrors(result.error);
        return {
            status: 400 ,
            message:'Validation Error',
            success: false,
            data: formattedErrors
        }
    }
    return {
        status: 200,
        success:true,
        data : body
    }
}