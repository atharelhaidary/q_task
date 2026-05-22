import { NextRequest, NextResponse } from "next/server";
import { generateNextResponse } from "@/backend/lib";
import { deleteTaskServices } from "@/backend/modules/task/delete-task/services/delete-task.services";
export async function POST(request: NextRequest) :Promise<NextResponse> {
    try{
        const response = await  deleteTaskServices(request);
        return generateNextResponse(response)
    }catch(error:any){
        return generateNextResponse({
            status: 500,
            message: error.message,
            success: false,
        })
    }
  }