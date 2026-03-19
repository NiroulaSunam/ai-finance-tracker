import { z } from "zod";

export const assetSchema = z.object({
    name: z.string().min(2).max(100),
    type: z.enum(['property', 'vehicle', 'equipment', 'electronics','other']),
    purchase_value: z.coerce.number().positive('Value must be positive'),
    purchase_date: z.string().min(1, 'Date is required'),
    description: z.string().max(256).optional(),
});

export type assetFormData = z.infer<typeof assetSchema>;