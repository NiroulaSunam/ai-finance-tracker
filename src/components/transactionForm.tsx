'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';


import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { createClient } from '@/lib/supabase/client';

import { transactionSchema, transactionFormData  } from '@/lib/validations/transaction';



export default function TransactionForm({ categories } :{

     // get the categories from the parent component 
    categories: { id: string; name: string; type: string; icon: string }[]

} ) {
    const [selectedType, setSelectedType] = useState('')

    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting } 
    } = useForm<transactionFormData>({
        resolver: zodResolver(transactionSchema) as any,
    });

    const router = useRouter();

    async function onSubmit(data: transactionFormData) {
        const supabase = createClient();
        const { data: authData } = await supabase.auth.getUser();

        if (!authData.user) return;

        const { error } = await supabase
        .from('transactions')
        .insert({
            user_id: authData.user.id,
            amount: data.amount,
            date: data.date,
            category_id: data.category_id,
            type: data.type,
            description: data.description,
        });

        if (error) {
            //console.error('Error adding transaction:', error);
            console.log('Error adding transaction:', JSON.stringify(error))
            return;
        }

        router.refresh();
    }

    return (
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <Label htmlFor="amount">Amount</Label>
                <Input 
                    id="amount" 
                    type="number" 
                    step="0.01" 
                    {...register('amount')} 
                    className="w-full"
                />
                {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}
            </div>

            <div>
                <Label htmlFor="date">Date</Label>
                <Input 
                    id="date" 
                    type="date" 
                    {...register('date')} 
                    className="w-full"
                />
                {errors.date && <p className="text-red-500">{errors.date.message}</p>}
            </div>

              <div>
                <Label htmlFor="type">Type</Label>
                <select 
                    id="type" 
                    {...register('type')}       
                    className="w-full border rounded p-2"
                    onChange={(e) => setSelectedType(e.target.value)}
                >
                    <option value="">Select a type</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                
                </select>
                {errors.type && <p className="text-red-500">{errors.type.message}</p>}
            </div>

            <div>
                <Label htmlFor="category_id">Category</Label>
                <select 
                    id="category_id" 
                    {...register('category_id')} 
                    className="w-full border rounded p-2"
                >
                    <option value="">Select a category</option>
                    {categories
                    .filter(category => category.type === selectedType)
                    .map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name} ({category.type})
                        </option>
                    ))}
                </select>
                {errors.category_id && <p className="text-red-500">{errors.category_id.message}</p>}
            </div>

            <div>
                <Label htmlFor="description">Description (optional)</Label>
                <Input 
                    id="description" 
                    type="text" 
                    {...register('description')} 
                    className="w-full"
                />
                {errors.description && <p className="text-red-500">{errors.description.message}</p>}
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
                Add Transaction
            </Button>
        </form>
    )

}

    
