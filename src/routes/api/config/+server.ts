import { Config } from '$lib/backend/config';
import { json } from "@sveltejs/kit";
import fs from "fs";
import path from 'path';

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
    const rootDir = "./data";
    const configPath = './data/config.json';
    if (!fs.existsSync(rootDir)) {
        fs.mkdirSync(rootDir, { recursive: true });
    }

    if (!fs.existsSync(configPath)) {
        let config = new Config();
        fs.writeFileSync(configPath, JSON.stringify(config, null, 4));
    }
}