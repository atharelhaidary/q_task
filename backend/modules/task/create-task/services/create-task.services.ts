import { TApiResponse} from "@/shared/types";
import { connectDB, validateRequest } from "@/backend/lib";
import { NextRequest } from "next/server"
import {  createTaskSchema } from "@/shared/schemas/task/create-task.schema";
import {  ITask, Task } from "@/backend/database";
import mongoose from "mongoose";
export async function createTaskServices (request : NextRequest ) : Promise<TApiResponse<ITask | Record<string,any>>> {
        const validation = await validateRequest<ITask>(request,createTaskSchema)
        if(!validation.success){
            return validation
        }
       const { data : body } = validation;
       const {  tags } = body
       await connectDB();
       if (!Task ) {
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
            const taskRecord = await Task.create([{
              ...body,
              tags : tags?.split(/[ ,]+/).filter(tag => tag.trim() !== "") || []
            }],{session})
            await session.commitTransaction();
            //create class successfully
            return {
                success : true,
                status : 200,
                data : taskRecord[0],
                message: "create task successfully"
            }
       }catch(error){
        await session.abortTransaction();
        return {
            success: false,
            status: 500,
            message: error.message || 'Failed to create task',
        };
       }finally{
            session.endSession();
       }
       
    
}