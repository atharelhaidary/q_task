import { z } from "zod";

export const deleteTaskSchema = z.object({
    ids: z.array(z.any())
        .min(1, "At least one ID is required")
        .superRefine((ids, ctx) => {
            ids.forEach((id, index) => {
                if (typeof id !== 'string') {
                    ctx.addIssue({
                        code: "custom",
                        message: `ID must be string at index ${index+1}`,
                        path: [index]
                    });
                }
                else if (!id || id.trim() === "") {
                    ctx.addIssue({
                        code:"custom",
                        message: `ID at index ${index+1} is required`,
                        path: [index]
                    });
                }
            });
        })
});

export type DeleteSTaskSchema = z.infer<typeof deleteTaskSchema>;