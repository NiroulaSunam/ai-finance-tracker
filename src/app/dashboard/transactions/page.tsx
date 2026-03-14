import TransactionForm from "@/components/transactionForm";
import TransactionList from "@/components/transactionList";
import { createClient } from "@/lib/supabase/server";

export default async function Transactions() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    const { data: transactions } = await supabase
    .from('transactions')
    .select('*')
    .order('date', { ascending: false });

    const { data: categories } = await supabase
    .from('categories')
    .select('*');  


    return (
        <div>
            {/* Parent page fetch transactions and categories, then pass them as props to the TransactionForm component */}
            <TransactionForm categories = {categories ?? []} />

            <TransactionList transactions={transactions ?? []} />
        </div>
    );
}   