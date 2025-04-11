<script>
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    let processing = false;

    let textArea;
    const username = $page.url.searchParams.get("username");
    const onlyPfps = $page.url.searchParams.get("onlypfp");
    const accounts = $page.url.searchParams.get("accounts");
    
    async function onInputReceived() {
        const data = textArea.value;
        let res;
        processing = true;
        if (onlyPfps == "true") {
            res = await processPfp(data);
        }
        else if (accounts != null) {
            res = await processMultiple(data);
        }
        else if(username != null) {
            res = await processSingle(data);
        }

        if (res.ok) {
            if(username){
                goto("/dashboard/account/" + username);
            }
            else{
                goto("/dashboard");
            }
        } else {
            const notifyEvent = new CustomEvent("displayNotification", {
                detail: "Error: Invalid data",
            });
            window.dispatchEvent(notifyEvent);
        }
        processing = false;
    }

    async function processSingle(data) {
        let res = await fetch("/api/accounts", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });

        return res;
    }

    async function processMultiple(data) {
        let dataArray = JSON.parse(data);

        for (let i = 0; i < dataArray.length; i++) {
            let res = await fetch("/api/accounts", {
                method: "POST",
                body: JSON.stringify(dataArray[i]),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });

            if (!res.ok) {
                const notifyEvent = new CustomEvent("displayNotification", {
                    detail: "Error: Invalid data",
                });
                window.dispatchEvent(notifyEvent);
                return res;
            }
        }

        return {
            ok: true,
        };
    }
    async function processPfp(data) {
        let res = await fetch("/api/gallery", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });

        return res;
    }
</script>

<h1 class="nomargin">Paste here</h1>
<p class="nomargin align-center">
    Paste the copied result from the console to this box:
</p>
<textarea class="scroll" bind:this={textArea}></textarea>
<button class="button" style="view-transition-name: nextbtn;" on:click={onInputReceived}
    >Done</button
>

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
