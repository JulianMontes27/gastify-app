import { z } from "zod";

export const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(1),
  amount: z.number().positive(),
});
export const newPostSchema = expenseSchema.omit({ id: true });
