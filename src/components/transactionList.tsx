

export default function TransactionList({ transactions } : {

    transactions: {
        id: string;
        user_id: string;
        amount: number;
        date: string;
        category_id: string;
        type: string;
        description: string;
    }[]

}) {

    // Define a mapping of transaction types to their corresponding colors
    const typeColors = {
        income: '#22c55e',
        expense: '#ef4444',    
        investment: '#3b82f6',
        asset: '#f59e0b',
        liability: '#8b5cf6',
    }
    return (
        <div>
            <h2>Transaction List</h2>
            <ul>
                {transactions.length === 0 ? ( <p>No transactions found.</p>) : (
                transactions.map(transaction => (
                    <li key={transaction.id} style={{color: typeColors[transaction.type as keyof typeof typeColors]}}>
                        {transaction.description} - ${transaction.amount} on {new Date(transaction.date).toLocaleDateString()}
                    </li>
                )))}
            </ul>
        </div>
    );
}       
