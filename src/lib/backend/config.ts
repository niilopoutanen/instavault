export class Config{
    introDone: boolean = false;
    chartType: ChartType = ChartType.Line;
    lastActiveUser: string = "";
    sidebarCollapsed: boolean = false;
}
export enum ChartType{
    Bar = "bar",
    Line = "line"
}

export async function getConfig(host){
    const res = await fetch(host + "/api/config");
    return await res.json();
}

export async function writeValue(key: string, value: any, host){
    const config = await getConfig(host);
    config[key] = value;
    await fetch(host + "/api/config", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(config)
    });
}