"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { createClient } from '@/lib/supabase/client';
import { signupSchema } from '@/lib/validations/auth';

// UI Components 
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  // Initialize the form with react-hook-form and zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  },);

   // State to handle error messages from authentication
  const [authError, setAuthError] = useState<string | null>(null);

  const router = useRouter();

  // Check if the user is already authenticated and redirect to dashboard
  async function onSubmit(data: SignupFormData) {
    const supabase = createClient();

    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          firstname: data.firstname,
          lastname: data.lastname,
        },
      },
    });

    if (error) {
      setAuthError(error.message);
      return;
    }

    // Insert default categories for the new user (hardcoded for simplicity, ideally should be dynamic or handled in a backend function)
    if (authData.user) {
      const { error: categoriesError } = await supabase
      .from('categories')
      .insert([
        { user_id: authData.user.id, name: 'Salary', icon: '💼', type: 'income' },
        { user_id: authData.user.id, name: 'Freelance', icon: '💻', type: 'income' },
        { user_id: authData.user.id, name: 'Investment Returns', icon: '📈', type: 'income' },
        { user_id: authData.user.id, name: 'Gift', icon: '🎁', type: 'income' },
        { user_id: authData.user.id, name: 'Other Income', icon: '🔄', type: 'income' },
        { user_id: authData.user.id, name: 'Food & Dining', icon: '🍔', type: 'expense' },
        { user_id: authData.user.id, name: 'Housing & Rent', icon: '🏠', type: 'expense' },
        { user_id: authData.user.id, name: 'Transport', icon: '🚗', type: 'expense' },
        { user_id: authData.user.id, name: 'Health', icon: '💊', type: 'expense' },
        { user_id: authData.user.id, name: 'Shopping', icon: '🛍️', type: 'expense' },
        { user_id: authData.user.id, name: 'Subscriptions', icon: '📱', type: 'expense' },
        { user_id: authData.user.id, name: 'Entertainment', icon: '🎬', type: 'expense' },
        { user_id: authData.user.id, name: 'Education', icon: '📚', type: 'expense' },
        { user_id: authData.user.id, name: 'Utilities', icon: '💡', type: 'expense' },
        { user_id: authData.user.id, name: 'Other Expense', icon: '🔄', type: 'expense' },
        { user_id: authData.user.id, name: 'Stocks', icon: '📊', type: 'investment' },
        { user_id: authData.user.id, name: 'Savings', icon: '🏦', type: 'investment' },
        { user_id: authData.user.id, name: 'Crypto', icon: '🪙', type: 'investment' },
        { user_id: authData.user.id, name: 'Borrowed', icon: '🏦', type: 'liability' },
        { user_id: authData.user.id, name: 'Payment', icon: '💳', type: 'liability' },
        { user_id: authData.user.id, name: 'Property', icon: '🏠', type: 'asset' },
        { user_id: authData.user.id, name: 'Vehicle', icon: '🚗', type: 'asset' },
        { user_id: authData.user.id, name: 'Electronics', icon: '💻', type: 'asset' },
        { user_id: authData.user.id, name: 'Cash & Bank', icon: '💰', type: 'asset' },
        { user_id: authData.user.id, name: 'Other Asset', icon: '🪙', type: 'asset' },
      ])

      if (categoriesError) {
        console.error('Error inserting default categories:', categoriesError);
      }
    }

    router.push('/dashboard');
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        {/* Signup form with validation and error handling */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="firstname">First Name</Label>
            <Input
              id="firstname"
              type="text"
              {...register('firstname')}
              className={errors.firstname ? 'border-red-500' : ''}
            />
            {errors.firstname && (
              <p className="text-red-500 text-sm mt-1">{errors.firstname.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="lastname">Last Name</Label>
            <Input
              id="lastname"
              type="text"
              {...register('lastname')}
              className={errors.lastname ? 'border-red-500' : ''}
            />
            {errors.lastname && (
              <p className="text-red-500 text-sm mt-1">{errors.lastname.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register('password')}
              className={errors.password ? 'border-red-500' : ''}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              className={errors.confirmPassword ? 'border-red-500' : ''}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {authError && (
            <p className="text-red-500 text-sm mt-1">{authError}</p>
          )}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </form>

        <p className='text-center text-sm mt-4'>
          Already have an account?{' '}
          <a href="/auth/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

