'use client';

import { useRouter } from 'next/navigation';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { createClient } from '@/lib/supabase/client';

import { liabilitySchema, liabilityFormData  } from '@/lib/validations/liabilities';

export default function LiabilityForm() {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<liabilityFormData>({
        resolver: zodResolver(liabilitySchema) as any,
    });

    const router = useRouter();

    async function onSubmit(data: liabilityFormData) {
        const supabase = createClient();
        const { data: authData } = await supabase.auth.getUser();

        if (!authData.user) return;

        const { error } = await supabase 
        .from('liabilities')
        .insert({
            user_id: authData.user.id,
            name: data.name,
            type: data.type,
            amount: data.total_amount,
            interest_rate: data.interest_rate,
            start_date: data.start_date,
        });

        if (error) {
            console.log('Error adding liability:', JSON.stringify(error))
            return;
        }
        
        router.refresh()     
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <Label htmlFor='name'>Liability Name</Label>
                <Input id='name' {...register('name')} />
                {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
            </div>
            <div>
                <Label htmlFor='type'>Type</Label>
                <Input id='type' {...register('type')} />
                {errors.type && <p className='text-red-500'>{errors.type.message}</p>}
            </div>
            <div>
                <Label htmlFor='total_amount'>Total Amount</Label>
                <Input id='total_amount' type='number' step='0.01' {...register('total_amount')} />
                {errors.total_amount && <p className='text-red-500'>{errors.total_amount.message}</p>}
            </div>
            <div>
                <Label htmlFor='interest_rate'>Interest Rate (%)</Label>
                <Input id='interest_rate' type='number' step='0.01' {...register('interest_rate')} />
                {errors.interest_rate && <p className='text-red-500'>{errors.interest_rate.message}</p>}
            </div>
            <div>
                <Label htmlFor='start_date'>Start Date</Label>
                <Input id='start_date' type='date' {...register('start_date')} />
                {errors.start_date && <p className='text-red-500'>{errors.start_date.message}</p>}
            </div>

            <Button type="submit" disabled={isSubmitting}>
                Add Liabilities
            </Button>
        </form>
     );
}
