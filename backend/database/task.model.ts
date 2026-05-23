
import { Model, Schema, model, models } from "mongoose";

export interface ITask extends Document {
        title : string
        desc :  string
        priority : number
        status : number
        tags : string[]
        createdAt?: Date;  
        updatedAt?: Date;
}

const TaskSchema = new Schema<ITask>(
    {
        title :  {
            type: String,       
            trim: true,
            lowercase: true,   
        },
        desc :   {
            type: String,       
            trim: true,
            lowercase: true,   
        },
        priority :  {
            type: Number   
        },
        status : {
            type: Number   
        },
        tags : {
            type: [String]   
        },
    },
    {  timestamps: true  }
);
const Task = (models.Task as Model<ITask>) || model<ITask>('Task', TaskSchema);
export default Task;

