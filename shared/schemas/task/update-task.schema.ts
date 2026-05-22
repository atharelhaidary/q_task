import z from "zod";
import { createTaskSchema } from "./create-task.schema";
export const updateTaskSchema = z.object({
    _id: z.string({ message: "ID is required" }).nonempty({ message: "ID is required" }),
}).extend(createTaskSchema.shape);
export type UpdateTaskSchemaType = z.infer<typeof updateTaskSchema>;