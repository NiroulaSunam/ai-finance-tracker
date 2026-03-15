

export default function SummaryCards(
    {income, expenses, balance}: {income: number, expenses: number, balance: number}
) {
    return (
        <div>
            <p>Income: {income}</p>
            <p>Expenses: {expenses}</p>
            <p>Balance: {balance}</p>
        </div>
    )
}
        