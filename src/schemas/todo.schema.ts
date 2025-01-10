import { z } from "zod";
export const todoSchema = z.object({
    id:z.number().readonly(),
    description:z.string(),
    created_at:z.string().readonly().optional(),
    completed_at:z.string().optional().nullable(),  // Add completed_at field
    completed:z.boolean().default(false).optional(),
    priority:z.number().default(4).optional(),
    position:z.number()
})
export const createTodoSchema = todoSchema.omit({ id: true,position:true }); // id is omitted

export type CreateTodoField = z.infer< typeof createTodoSchema>

export type TodoField = z.infer< typeof todoSchema>






