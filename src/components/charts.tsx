'use client'

import  { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Charts({transactions} : {
    transactions: {
        amount: number;
        date: string;
        category_id: string;
        type: string;
    } []
}) {
    const chartData = transactions.reduce((acc, transaction)=> {
        // get the month name from the date
        const month = new Date(transaction.date).toLocaleDateString('en-Us', {
            month: 'short',
            year: 'numeric',
        })

        // if this month doesn't exist in our accumulator yet, create it
        if (!acc[month]) {
            acc[month] = {
                month,
                income: 0,
                expense: 0,
            }
        }

        // add the transaction amount to the appropriate type (income or expense)
        if (transaction.type === 'income') {
            acc[month].income += transaction.amount;
        } else if (transaction.type === 'expense') {
            acc[month].expense += transaction.amount;
        }

        return acc;
    }, {} as Record<string, { month: string; income: number; expense: number }>);

    // convert the accumulated data into an array for the chart
    const data = Object.values(chartData);    

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#22c55e" />
                <Bar dataKey="expense" fill="#ef4444" />
            </BarChart>
        </ResponsiveContainer>
    )
}