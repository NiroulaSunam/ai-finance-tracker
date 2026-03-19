import AssetForm from "@/components/assetsForm";

import { createClient } from "@/lib/supabase/server";

export default async function Assets() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    const { data: assets } = await supabase
    .from('assets')
    .select('*')
    .order('created_at', { ascending: false });


    return (
        <div>
            <AssetForm/>
        </div>
    );
}   