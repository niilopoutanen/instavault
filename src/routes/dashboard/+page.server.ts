import { redirect } from "@sveltejs/kit";
import { getConfig } from "$lib/backend/config.js";
export async function load(props) {
    const res = await fetch(`${props.url.origin}/api/accounts`);
    const data = await res.json();

    const config = await getConfig();

    let userToDisplay: string;
    if(config.lastActiveUser && config.lastActiveUser != ""){
        for(let user of data){
            if(user.username == config.lastActiveUser){
                userToDisplay = user.username;
                break;
            }
        }
    }
    else{
        userToDisplay = data[0].username;
    }

    redirect(307, "/dashboard/account/" + userToDisplay);
}