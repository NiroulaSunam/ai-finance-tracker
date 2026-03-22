
export default function AssetsList({ assets } : {
    
    assets: {
        id: string;
        user_id: string;
        name: string;
        type: string;
        purchase_value: number;
        purchase_date: string;
        description?: string;
    }[]

}) {
        
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Your Assets</h2>
            {assets.length === 0 ? (
                <p>No assets added yet.</p>
            ) : (
                <ul className="space-y-4">
                    {assets.map((asset) => (
                        <li key={asset.id} className="border p-4 rounded">
                            <h3 className="text-lg font-semibold">{asset.name}</h3>
                            <p>Type: {asset.type}</p>
                            <p>Purchase Value: ${asset.purchase_value.toFixed(2)}</p>
                            <p>Purchase Date: {new Date(asset.purchase_date).toLocaleDateString()}</p>
                            {asset.description && <p>Description: {asset.description}</p>}
                        </li>
                    ))}
                </ul>
            )} 
        </div>
    );
}