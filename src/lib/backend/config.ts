export class Config{
    introDone: boolean = false;
    chartType: ChartType = ChartType.Line;
    lastActiveUser: string = "";
}
export enum ChartType{
    Bar = "bar",
    Line = "line"
}

export async function getConfig(){
    const res = await fetch("http://localhost:5000/api/config");
    return await res.json();
}

export async function writeValue(key: string, value: any){
    const config = await getConfig();
    config[key] = value;
    await fetch("http://localhost:5000/api/config", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(config)
    });
}