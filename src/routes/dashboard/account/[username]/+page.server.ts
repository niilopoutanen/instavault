import { Snapshot } from '$lib/backend/models.js';
import { redirect } from "@sveltejs/kit";

export async function load({ params, url }): Promise<Snapshot> {
    const username = params.username;

    const res = await fetch(`${url.origin}/api/accounts/${username}`);
    const data: Snapshot = await res.json();
    
    if(data == null){
        redirect(307, "/import");
    }

    return data;
}