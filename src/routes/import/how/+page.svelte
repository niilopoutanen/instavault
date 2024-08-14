<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import TutorialParts from "$lib/components/TutorialParts.svelte";
    const username = $page.url.searchParams.get("username");
</script>

<h1 class="nomargin">Run the script</h1>
<TutorialParts/>

<div class="controls">
    <a class="button layer-2" href="https://instagram.com/{username}" target="_blank">Open Instagram</a>
    <a class="button" style=" view-transition-name: nextbtn;" href="/import/paste?username={username}">Continue</a>
</div>

<style lang="scss">
    @use "$lib/styles/vars.scss" as *;

    .controls{
        display: flex;
        flex-direction: row;
        gap: 10px;
    }
</style>
