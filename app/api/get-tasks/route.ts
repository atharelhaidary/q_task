import connectDB from "@/backend/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { pagination, generateNextResponse } from "@/backend/lib";
import { ITask, Task} from "@/backend/database";
//fetch event
export async function GET(req: NextRequest) :Promise<NextResponse> {
    try{
     await  connectDB();
     const searchParams = req.nextUrl.searchParams;
     const params = Object.fromEntries(searchParams);
     if(!Task){
        return generateNextResponse({
            status: 500,
            message: 'Class model not found',
            success: false,
        })
     }
     const grades = await pagination<ITask>(Task,params,{
        searchFields : ['title','desc'],
     })
    return generateNextResponse<ITask>({...grades})
    }catch(error:any){
        return generateNextResponse({
            status: 500,
            message: error.message,
            success: false,
        })
    }
  }