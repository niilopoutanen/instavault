<script>
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    let textArea;
    const username = $page.url.searchParams.get("username");

    async function process() {
        const text = textArea.value;

        const res = await fetch("/api/accounts", {
            method: "POST",
            body: JSON.stringify(text),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        if(res.ok){
            goto("/dashboard/account/" + username);
        }
        else{
            const notifyEvent = new CustomEvent("displayNotification", { detail: "Error: Invalid data" });
            window.dispatchEvent(notifyEvent);
        }
    }
</script>

<h1 class="nomargin">Paste here</h1>
<p class="nomargin">Paste the copied result from console to this box:</p>
<textarea class="scroll" bind:this={textArea}></textarea>
<button class="button" style="view-transition-name: nextbtn;" on:click={process}>Done</button>

<style lang="scss">
    @use "$lib/styles/vars.scss" as *;
    textarea {
        margin-bottom: 20px;
        width: 100%;
        max-width: 100%;
        min-width: 100%;
        height: 350px;
        font-size: 12px;
        resize: none;
    }
</style>
