import { ITask } from "@/backend/database";
import { generateNextResponse } from "@/backend/lib";
import { updateTaskServices } from "@/backend/modules/task/update-task/services/update-task.services";
import { NextRequest, NextResponse } from "next/server"
export async function POST (request : NextRequest ) : Promise<NextResponse>{
    try{
        const response = await  updateTaskServices(request);
        return generateNextResponse<ITask>(response)
    }catch(error:any){
        const errors = error || error.message
        return generateNextResponse({
            status: 500,
            message: error.message,
            success: false,
        })
    }
}