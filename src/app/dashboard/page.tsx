import SummaryCards from '@/components/summaryCards';
import { createClient } from '@/lib/supabase/server';

export default async function Dashboard() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    // Get transactions for the current month
    const now = new Date();
    const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const { data: monthlyTransactions } = await supabase
        .from('transactions')
        .select('*')
        .gte('date', firstOfMonth.toISOString()) //gte = greater than or equal to
        .order('date', { ascending: false });

    const income = monthlyTransactions
        ?.filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0) ?? 0;

    const expenses = monthlyTransactions
        ?.filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0) ?? 0; // reduce = loops through an array and accumulates the values. totaling. 

    const balance = income - expenses;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p>Welcome to your dashboard! {user?.user_metadata.firstname} Here you can manage your finances and track your expenses.</p>
            
            <SummaryCards income={income} expenses={expenses} balance={balance} />
        </div>
    );
}