<script>
    import { ChartType, getConfig, writeValue } from "$lib/backend/config";
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    let config;

    let controls = {};

    onMount(async () => {
        config = await getConfig($page.url.origin);
        console.log(config);
        await load();
    });

    async function load() {
        await loadDropdown("chartType", controls.chartType);
        await loadSwitch("sidebarCollapsed", controls.sidebarSwitch);
        await loadSwitch("showPfpsInDashboard", controls.showPfpsSwitch);

        controls.chartType.addEventListener("change", async (event) => await onSelectChange(event, "chartType"));
        controls.sidebarSwitch.addEventListener("change", async (event) => {
            await onSwitchChange(event, "sidebarCollapsed");
            location.reload();
        });
        controls.showPfpsSwitch.addEventListener("change", async (event) => {
            await onSwitchChange(event, "showPfpsInDashboard")
            location.reload();
        });
    }

    async function onButtonClick(key) {
        writeValue(key, config[key] ? false : true, $page.url.origin);
        config = await getConfig($page.url.origin);
    }

    async function onSelectChange(event, key) {
        const value = event.target.value;
        writeValue(key, value, $page.url.origin);
        config = await getConfig($page.url.origin);
    }

    async function onSwitchChange(event, key) {
        console.log("writing value ", event.target.checked, " to key ", key);
        const value = event.target.checked;
        writeValue(key, value, $page.url.origin);
        config = await getConfig($page.url.origin);
    }

    async function loadDropdown(key, object) {
        if (!object) return;
        config = await getConfig($page.url.origin);
        object.value = config[key];
    }

    async function loadSwitch(key, object) {
        if (!object) return;
        config = await getConfig($page.url.origin);
        console.log(config[key])
        object.checked = config[key];
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
        <p class="nomargin title">Collapsed sidebar</p>
        <div class="switch">
            <input type="checkbox" name="switch" class="switch-checkbox" id="sidebarSwitch" tabindex="0" bind:this={controls.sidebarSwitch}>
            <label class="switch-label" for="sidebarSwitch"></label>
        </div>
    </div>

    <div class="control">
        <p class="nomargin title">Show profile pictures in dashboard lists (slows down loading)</p>
        <div class="switch">
            <input type="checkbox" name="switch" class="switch-checkbox" id="showPfpsSwitch" tabindex="0" bind:this={controls.showPfpsSwitch}>
            <label class="switch-label" for="showPfpsSwitch"></label>
        </div>
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
        padding-right: 40px;
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
