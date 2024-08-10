<script>
    import SideBar from "$lib/components/SideBar.svelte";
    import { onMount } from "svelte";
    let accounts;
    onMount(async () => {
        const res = await fetch("/api/accounts");
        accounts = await res.json();
    });

</script>
<svelte:head>
    <title>InstaVault - Dashboard</title>
</svelte:head>


<div id="dashboard">
    <SideBar accounts={accounts}/>
    <div class="window">
        <slot />
    </div>
</div>

<style lang="scss">
    @use "$lib/styles/vars.scss" as *;
    #dashboard {
        display: flex;
        flex-direction: row;
        background-color: light-dark($layer-1-light, $layer-1-dark);
        height: 100%;
        overflow: hidden;
        .window {
            width: 100%;
            height: 100%;

            display: flex;
            flex-direction: column;
            overflow-y: auto;

            padding: 40px;
            gap: 40px;
            box-sizing: border-box;

            &::-webkit-scrollbar {
                width: 15px;
            }

            &::-webkit-scrollbar-track {
                background: transparent;
            }

            &::-webkit-scrollbar-thumb {
                background: light-dark(#c9c9c9, $layer-3-dark);
                border-radius: 10px;
                border: 4px solid light-dark($layer-1-light, $layer-1-dark);
            }
        }
    }
</style>
