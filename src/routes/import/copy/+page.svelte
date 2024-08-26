<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import Icon from "$lib/components/Icon.svelte";
    import { getConfig } from "$lib/backend/config";
    import { goto } from "$app/navigation";
    let codeBlock;
    const username = $page.url.searchParams.get("username");
    const onlyPfps = $page.url.searchParams.get("onlypfp");

    function copy() {
        navigator.clipboard.writeText(codeBlock.innerText);
        const notifyEvent = new CustomEvent("displayNotification", { detail: "Data copied" });
        window.dispatchEvent(notifyEvent);
    }
    onMount(async () => {
        if (username) {
            const script = await fetch("/script.js");
            let content = await script.text();
            content = content.replaceAll("usernamehere", username);

            
            if(onlyPfps){
                content = content.replace("savePfps = false", "savePfps = true");
            }
           
            codeBlock.innerHTML = content;
        }
    });

    async function next(){
        const config = await getConfig($page.url.origin);
        if(config.skipConsoleTutorial){
            goto("/import/paste?onlypfp="+ onlyPfps + "&username=" + username);
        }
        else{
            goto("/import/how?onlypfp="+ onlyPfps + "&username=" + username);
        }
    }
</script>


<p>Copy this script:</p>
<pre class="scroll nomargin" bind:this={codeBlock}></pre>

<div class="controls">
    <button class="button layer-2 copy" on:click={copy}>
        <Icon name="copy" width={"16px"} height={"16px"} />
        <p class="nomargin">Copy</p>
    </button>
    <button class="button" style="view-transition-name: nextbtn;" on:click={next}>Continue</button>
</div>

<style lang="scss">
    @use "$lib/styles/vars.scss" as *;
    pre {
        max-width: 100%;

        max-height: 350px;
        overflow-y: scroll;
        overflow-x: hidden;
        padding: 10px;
        border-radius: 10px;
        box-sizing: border-box;

        background-color: light-dark($layer-2-light, $layer-2-dark);
    }
    .controls {
        display: flex;
        gap: 20px;
    }
</style>
