import { Config } from '$lib/backend/config';
import { json } from "@sveltejs/kit";
import fs from "fs";

export function GET() {
    verify();
    const path = "./data/config.json";
    const data = fs.readFileSync(path, "utf8");
    const parsedData = JSON.parse(data);
    const config = Object.assign(new Config(), parsedData);
    return json(config);
}

export async function POST({ request }) {
    const config = await request.json();
    const path = "./data/config.json";
    fs.writeFileSync(path, JSON.stringify(config, null, 4), "utf8");
    return json({ message: "Config updated successfully" });
}

function verify() {
    const path = "./data/config.json";
    if (!fs.existsSync(path)) {
        let config = new Config();
        fs.writeFileSync(path, JSON.stringify(config));
    }
}