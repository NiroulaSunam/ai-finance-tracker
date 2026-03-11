"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { signupSchema } from '@/lib/validations/auth';

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

    router.push('/login');
  }
  
  return (
    <div>
      <h1>Sign Up</h1>
    </div>
  );
}

