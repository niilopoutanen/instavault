import type { Snapshot } from './$types.js';

export async function load({ params, url }): Promise<Snapshot> {
    const username = params.username;

    const res = await fetch(`${url.origin}/api/accounts/${username}`);
    const data: Snapshot = await res.json();

    return data;
}