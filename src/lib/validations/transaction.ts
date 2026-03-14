import { z } from 'zod';

export const transactionSchema = z.object({
    amount: z.coerce.number().positive("Amount must be positive"),
    date: z.string(),
    category_id: z.string(),
    type: z.enum(['income', 'expense', 'investment', 'liability', 'asset']),
    description: z.string().optional(),
});

export type transactionFormData = z.infer<typeof transactionSchema>