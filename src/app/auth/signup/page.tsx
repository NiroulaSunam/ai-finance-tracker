"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

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

  const router = useRouter();

  // Check if the user is already authenticated and redirect to dashboard
  async function onSubmit(data: SignupFormData) {
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
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
      console.log(error.message);
      return;
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

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </form>
      </div>
    </div>
  );
}

