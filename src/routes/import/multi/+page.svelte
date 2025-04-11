<script lang="ts">
    import { goto } from '$app/navigation';
    export let data;

    function selectionReady(){
        const selectedAccounts = Array.from(document.querySelectorAll('.account input:checked')).map(input => input.value);
        if (selectedAccounts.length > 0) {
            goto("/import/copy?accounts=" + selectedAccounts.join(","));
        } else {
            alert("Please select at least one account.");
        }
    }
</script>
<h1 class="nomargin align-center">Load data for multiple accounts at once</h1>
<div class="list">
    {#each data.accounts as account}
        <div class="account" style="view-transition-name: {account.username}">
            <input class="checkbox-round" type="checkbox" id="{account.username}" name="{account.username}" value="{account.username}" />
            <img src="/data/accounts/{account.username}/pfp.jpg" alt="Profile picture" class="pfp" />
            <a href="/import/copy?username={account.username}">{account.username}</a>
        </div>
    {/each}
</div>

<button class="button" style="view-transition-name: nextbtn;" on:click={selectionReady}>Start import</button>


<style lang="scss">
    @use "$lib/styles/vars.scss" as *;
    .list{
        display: flex;
        flex-direction: column;
        width: 100%;

        .account{
            display: flex;
            padding: 10px 20px 12px 20px;
            align-items: center;
            border-bottom: 2px solid light-dark($layer-2-light, $layer-2-dark);
            width: 100%;


            input{
                width: 20px;
                height: 20px;
                margin-right: 30px;
                border-radius: 50%;
            }
            .pfp{

                width: 60px;
                height: 60px;
                border-radius: 50%;
                margin-right: 10px;
            }

            a{
                text-decoration: none;
                color: white;
            }
        }
    }
</style>