import { z } from "zod";
export const createTaskSchema = z.object({
      title: z.string({message:"Title must be string"}).nonempty({ message :"Title is required"}),   
      desc: z.string({message:"Description must be string"}).nonempty({ message :"Description is required"}),
      priority :  z.number({ message: "Priority must be number" })
              .min(0, { message: "Priority must be Low, Medium or Hard" })
              .max(2, { message: "Priority must be Low, Medium or Hard"  }),
      status :  z.number({ message: "Status must be number" })
            .min(0, { message: "Status must be To Do, In Progress or Done" })
            .max(2, { message: "Status must be To Do, In Progress or Done"   }),

     
})
export type CreateTaskSchemaType= z.infer<typeof createTaskSchema>;
















    


