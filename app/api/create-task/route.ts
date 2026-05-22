import { ITask } from "@/backend/database";
import { generateNextResponse } from "@/backend/lib";
import { createTaskServices } from "@/backend/modules/task/create-task/services/create-task.services";
import { NextRequest, NextResponse } from "next/server"
export async function POST (request : NextRequest ) : Promise<NextResponse>{
    try{
        const response = await  createTaskServices(request);
        return generateNextResponse<ITask>(response)
    }catch(error:any){
        return generateNextResponse({
            status: 500,
            message: error.message,
            success: false,
        })
    }
}