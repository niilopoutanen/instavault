<script>
    import { ChartType, getConfig,  writeValue } from "$lib/backend/config";
    import { onMount } from "svelte";
    let config;

    let controls = {};

    onMount(async () => {
        config = await getConfig();
        console.log(config);
        load();
    });

    function load(){
        loadDropdown("chartType", controls.chartType);
        controls.chartType.addEventListener("change", (event) => onSelectChange(event, "chartType"));
    }
    async function onButtonClick(key) {
        writeValue(key, config[key] ? false : true);
        config = await getConfig();
    }

    async function onSelectChange(event, key) {
        const value = event.target.value;
        writeValue(key, value);
        config = await getConfig();
    }

    async function loadDropdown(key, object){
        if(!object) return;
        config = await getConfig();
        object.value = config[key];
    }
</script>

<h1 class="nomargin">Settings</h1>

<div class="settings">
    <div class="control">
        <p class="nomargin title">Chart type</p>
        <select bind:this={controls.chartType}>
            <option value={ChartType.Line}>Line</option>
            <option value={ChartType.Bar}>Bar</option>
        </select>
    </div>

    <div class="control">
        <p class="nomargin title">Reset intro</p>
        <button class="button secondary layer-3" on:click={() => onButtonClick("introDone")}>Reset</button>
    </div>
</div>

<style lang="scss">
    @use "$lib/styles/vars.scss" as *;
    .settings {
        display: flex;
        flex-direction: column;
        gap: 20px;
        max-width: 800px;
    }
    .control {
        background-color: light-dark($layer-2-light, $layer-2-dark);
        width: 100%;
        padding: 20px;
        border-radius: 10px;

        display: flex;
        flex-direction: row;
        align-content: center;

        .title {
            width: 100%;
            align-self: center;
        }
    }
</style>