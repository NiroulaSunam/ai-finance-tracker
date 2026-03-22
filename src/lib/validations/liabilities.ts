import { z } from "zod";

export const liabilitySchema = z.object({
    name: z.string().min(2).max(100),
    type: z.enum(['loan', 'credit_card', 'mortgage', 'other']),
    total_amount: z.coerce.number().positive('Amount must be positive'),
    interest_rate: z.coerce.number().min(0, 'Interest rate cannot be negative').max(100, 'Interest rate cannot exceed 100%'),
    start_date: z.string().min(1, 'Start date is required'),
});

export type liabilityFormData = z.infer<typeof liabilitySchema>;