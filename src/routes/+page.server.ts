import { Config, getConfig } from "$lib/backend/config";
import { redirect } from "@sveltejs/kit";


export async function load() {
    const config: Config = await getConfig();
    if (config.introDone) {
        redirect(307, "/dashboard");
    }
    else{
        redirect(307, "/intro");
    }
}