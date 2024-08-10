<script>
    import { goto } from "$app/navigation";
    import Error from "$lib/components/Error.svelte";
    let input;
    let errorMsg;

    async function onAccountSelected() {
        let account = input.value;
        if (account && account.length > 0) {
            goto("/import/copy?username=" + account);
        } else {
            errorMsg = "Please enter a valid username.";
        }
    }
</script>

<h1 class="nomargin">Import account</h1>
<p class="align-center nomargin">Give the name of the username you want to start tracking.</p>

<input class="center" bind:this={input} type="text" placeholder="Username" required />
<Error msg={errorMsg} />
<button class="button" style="view-transition-name: nextbtn;" on:click={onAccountSelected}>Import</button>
