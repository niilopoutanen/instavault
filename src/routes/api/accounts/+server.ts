import fs from "fs";
import { json } from "@sveltejs/kit";
import { getDay, getTime } from "$lib/backend/utils.js";
export async function GET() {
    const dataPath = "./data";
    const users = fs.readdirSync(dataPath, { withFileTypes: true })
    let accounts = [];
    for (const user of users) {
        if (user.isDirectory()) {
            const accountPath = `${dataPath}/${user.name}/account.json`;
            const accountData = JSON.parse(fs.readFileSync(accountPath, 'utf8'));
            accounts.push(accountData);
        }
    }

    return json(accounts);
}

export async function POST({ request }) {
    const data = JSON.parse(await request.json());
    const userPath = `./data/${data.account.username}`;
    const snapshotPath = `${userPath}/${getDay()}/${getTime()}`;
    fs.mkdirSync(snapshotPath, { recursive: true });

    const accountFile = `${userPath}/account.json`;
    const mainPfpFile = `${userPath}/pfp.jpg`;
    const currentPfpFile = `${snapshotPath}/pfp.jpg`;
    const followersFile = `${snapshotPath}/followers.json`;
    const followingFile = `${snapshotPath}/following.json`;

    fs.writeFileSync(accountFile, JSON.stringify(data.account, null, 4), 'utf8');
    fs.writeFileSync(followersFile, JSON.stringify(data.followers, null, 4), 'utf8');
    fs.writeFileSync(followingFile, JSON.stringify(data.following, null, 4), 'utf8');

    const pfpReq = await fetch(data.account.pfp);
    const pfpBuffer = await pfpReq.arrayBuffer();
    fs.writeFileSync(mainPfpFile, Buffer.from(pfpBuffer));
    fs.writeFileSync(currentPfpFile, Buffer.from(pfpBuffer));
    
    return json({ message: "success" });
}