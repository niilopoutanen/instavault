<script>
    import { Periods } from "$lib/backend/models";
    import { writeValue } from "$lib/backend/config";
    import { page } from "$app/stores";

    export let activePeriod = Periods.all[0];
    export let connected = false;
    function setActiveItem(item) {
        activePeriod = item;
        writeValue("defaultPeriodId", item.id, $page.url.origin);
    }

    $: {
        console.log(activePeriod);
    }
</script>

<div class="chips {connected ? 'connected' : ''}">
    {#each Periods.all as item}
        <button class="chip" on:click={() => setActiveItem(item)} class:active={activePeriod === item}>
            <p class="nomargin">{item.title}</p>
        </button>
    {/each}
</div>

<style lang="scss">
    @use "$lib/styles/vars.scss" as *;
    .chips {
        display: flex;
        flex-direction: row;
        gap: 10px;

        .chip {
            border-radius: 1000px;
            padding: 5px 10px;
            background-color: light-dark($layer-2-light, $layer-2-dark);

            border: none;
            outline: none;
            font-family: "Inter";
            font-weight: 500;
            cursor: pointer;

            transition:
                background-color 0.2s,
                color 0.2s;
            &.active {
                background-color: $accent;
                color: white;
            }
        }
        &.connected {
            gap: 0;
            border-radius: 1000px;
            background-color: light-dark($layer-2-light, $layer-2-dark);

            .chip {
                background-color: transparent;
                &.active {
                    background-color: $accent;
                    color: white;
                }
            }
        }
    }
</style>
