import { createClient } from '@/lib/supabase/server';

export default async function Dashboard() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p>Welcome to your dashboard! {user?.user_metadata.firstname} Here you can manage your finances and track your expenses.</p>
        </div>
    );
}