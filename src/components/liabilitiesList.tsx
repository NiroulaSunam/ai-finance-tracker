
export default function LiabilitiesList({ liabilities } : {
    liabilities: {
        id: string;
        user_id: string;
        name: string;
        type: string;
        amount: number;
        interest_rate: number;
        start_date: string;
    }[]

    }) {
        
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Your Liabilities</h2>
            {liabilities.length === 0 ? (
                <p>No liabilities added yet.</p>
            ) : (
                <ul className="space-y-4">
                    {liabilities.map((liability) => (
                        <li key={liability.id} className="border p-4 rounded">
                            <h3 className="text-lg font-semibold">{liability.name}</h3>
                            <p>Type: {liability.type}</p>
                            <p>Total Amount: ${liability.amount.toFixed(2)}</p>
                            <p>Interest Rate: {liability.interest_rate}%</p>
                            <p>Start Date: {new Date(liability.start_date).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            )} 
        </div>
    );
}