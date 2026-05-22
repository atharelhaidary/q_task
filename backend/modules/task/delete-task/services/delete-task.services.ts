import { TApiResponse} from "@/shared/types";
import { connectDB, validateRequest } from "@/backend/lib";
import { NextRequest } from "next/server"
import { Task } from "@/backend/database";
import {  deleteTaskSchema } from "@/shared/schemas/task/delete-task.schema";
import mongoose from "mongoose";
export async function deleteTaskServices (request : NextRequest ) : Promise<TApiResponse> {
        const validation = await validateRequest(request,deleteTaskSchema)
        const { data, ...validationWithoutData } = validation
        if(!validation.success){
            return {
                ...validationWithoutData,
                message: Object?.values(data)?.join("\n") 
            }
        }
       const { data : body } = validation;
       const { ids : taskIds } = body;
       await connectDB();
       if ( !Task ) {
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
                //delete from task model
                await Task.deleteMany(
                    {_id : {$in : taskIds}},
                    {session}
                )
                await session.commitTransaction();
                //delete class successfully
                return {
                success : true,
                status : 200,
                message : `Delete tasks successfully`,
                }

       }catch(error){
        await session.abortTransaction();
        return {
            success: false,
            status: 500,
            message: error.message || 'Failed to delete  task',
        };
       }finally{
            session.endSession();
       }
       
}