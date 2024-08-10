<script>
    import Center from "$lib/components/Center.svelte";

</script>

<Center>
    <slot/>
</Center>

<svelte:head>
    <title>InstaVault - Add new account</title>
</svelte:head>

<style lang="scss">
    @use "$lib/styles/vars.scss" as *;
    .import {
        width: 100%;
        height: 100%;
        min-height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: light-dark($layer-1-light, $layer-1-dark);

        .content {
            width: 100%;
            max-width: 450px;
            height: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 20px;
            box-sizing: border-box;
        }
    }
</style>
