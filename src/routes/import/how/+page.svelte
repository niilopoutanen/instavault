<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import TutorialParts from "$lib/components/TutorialParts.svelte";
    import { writeValue } from "$lib/backend/config";
    import { goto } from "$app/navigation";
    const username = $page.url.searchParams.get("username");

    function dontShowAgain(){
        writeValue("skipConsoleTutorial", true, $page.url.origin);
        goto("/import/paste?username=" + username)
    }
</script>

<h1 class="nomargin">Run the script</h1>
<TutorialParts/>

<div class="controls">
    <button class="button layer-2" on:click={dontShowAgain}>Don't show again</button>
    <a class="button layer-2" href="https://instagram.com/{username}" target="_blank">Open Instagram</a>
    <a class="button" style=" view-transition-name: nextbtn;" href="/import/paste?username={username}">Continue</a>
</div>

<style lang="scss">
    @use "$lib/styles/vars.scss" as *;

    .controls{
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 10px;
        button, a{
            font-size: 15px;
        }
    }
</style>
