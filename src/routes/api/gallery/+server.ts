import fs from "fs";
import { json } from "@sveltejs/kit";
export async function GET(){
    const galleryPath = `./data/gallery`;
    const returnPath = `/data/gallery`;
    if(!fs.existsSync(galleryPath)){
        return json(null);
    }
    const files = fs.readdirSync(galleryPath);
    let pfps = [];
    for(const file of files){
        const pfp = `${returnPath}/${file}`;
        pfps.push(pfp);
    }
    return json(pfps);
}
export async function POST({ request }) {
    const data = JSON.parse(await request.json());

    const galleryPath = `./data/gallery`;
    if(!fs.existsSync(galleryPath)){
        fs.mkdirSync(galleryPath, { recursive: true });
    }

    const processedAccounts = new Set();
    for(const account of data){
        console.log("Loading account", account);

        if(account.id && processedAccounts.has(account.id)) continue;
        processedAccounts.add(account.id);

        if(!account.pfp) continue;
        const accountFile = `${galleryPath}/${account.id}.png`;
        const pfpReq = await fetch(account.pfp);
        const pfpBuffer = await pfpReq.arrayBuffer();
        fs.writeFileSync(accountFile, Buffer.from(pfpBuffer));
        console.log("processed");
    }
    
    return json({ message: "success" });
}

