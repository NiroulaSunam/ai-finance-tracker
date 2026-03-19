'use client';

import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { createClient } from '@/lib/supabase/client';

import { assetSchema, assetFormData } from '@/lib/validations/assets';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function AssetForm() {

    const {
        register, 
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<assetFormData>({
        resolver: zodResolver(assetSchema) as any,
    });

    const router = useRouter();

    async function onSubmit(data: assetFormData) {
        const supabase = createClient();
        const { data: authData } = await supabase.auth.getUser();

        if (!authData.user) return;

        const { error } = await supabase
        .from('assets')
        .insert({
            user_id: authData.user.id,
            name: data.name,
            type: data.type,
            purchase_value: data.purchase_value,
            purchase_date : data.purchase_date,
            description: data.description,
        });

        if (error) {
            console.log('Error adding asset:', JSON.stringify(error))
            return;
        }

        router.refresh()     
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <Label htmlFor="name">Asset Name</Label>
                <Input id="name" {...register('name')} />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            <div>
                <Label htmlFor="value">Value</Label>
                <Input id="value" type="number" step="0.01" {...register('purchase_value')} />
                {errors.purchase_value && <p className="text-red-500">{errors.purchase_value.message}</p>}
            </div>

            <div>
                <Label htmlFor="description">Description (optional)</Label>
                <Input id="description" {...register('description')} />
                {errors.description && <p className="text-red-500">{errors.description.message}</p>}
            </div>

            <div>
                <Label htmlFor="type">Type</Label>
                <select id="type" {...register('type')} className="w-full border rounded p-2">
                    <option value="">Select type</option>
                    <option value="property">Property</option>
                    <option value="vehicle">Vehicle</option>
                    <option value="equipment">Equipment</option>
                    <option value="electronics">Electronics</option>
                    <option value="other">Other</option>
                </select>
                {errors.type && <p className="text-red-500">{errors.type.message}</p>}
            </div>

            <div>
                <Label htmlFor="purchase_date">Purchase Date</Label>
                <Input id="purchase_date" type="date" {...register('purchase_date')} />
                {errors.purchase_date && <p className="text-red-500">{errors.purchase_date.message}</p>}
            </div>

            <Button type="submit" disabled={isSubmitting}>
                Add Asset
            </Button>
        </form>
    );
}   