'use client'

import {useRouter} from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from './ui/button';

export default function LogoutButton() {

    const router = useRouter();

    async function handleLogout() {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push('/auth/login')
    }
    
    
    return (
        <main>
            <Button onClick={handleLogout} variant="outline" className="ml-auto">
                Logout
            </Button>
        </main>
    );
}