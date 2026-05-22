import { TApiResponse} from "@/shared/types";
import { connectDB, validateRequest } from "@/backend/lib";
import { NextRequest } from "next/server"
import { ITask , Task} from "@/backend/database";
import {  updateTaskSchema } from "@/shared/schemas/task/update-task.schema";
import mongoose from "mongoose";
export async function updateTaskServices (request : NextRequest ) : Promise<TApiResponse<ITask | Record<string,any>>> {
        const validation = await validateRequest<ITask>(request, updateTaskSchema )
        if(!validation.success){
            return validation
        }
       const { data : body } = validation ;
       const { _id, tags } = body
       await connectDB();
       if (!Task) {
        return {
            status: 500,
            message: 'Required models not found',
            success: false,
        };
      }
     //start session
     const session = await mongoose.startSession();
     session.startTransaction();
     try{
            //update class model
            const updatedTask =  await Task.findByIdAndUpdate(
                    _id,
                    {
                        ...body,
                        tags : tags?.split(/[ ,]+/).filter(tag => tag.trim() !== "") || []

                    },
                    {returnDocument : 'after', session }
            )
            await session.commitTransaction();
            //update task successfully
                return {
                    success : true,
                    status : 200,
                    data : updatedTask,
                    message: "update task successfully"
                }

     }catch(error){
        await session.abortTransaction();
        return {
            success: false,
            status: 500,
            message: error.message || 'Failed to task class',
        };
       }finally{
            session.endSession();
       }
       
    
}
