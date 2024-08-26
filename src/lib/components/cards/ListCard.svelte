<script>
    import Card from "../Card.svelte";

    export let data;
    export let title;
    export let maxHeight = 300;
</script>

<Card {title} class="span2 list">
    <p slot="header" class="title nomargin right">{data?.length}</p>
    <div class="accounts scroll" style="max-height: {maxHeight}px;">
        {#if data}
        {#each data as account}
            <a class="account" href="https://instagram.com/{account.username}" target="_blank" title="Click to open account in Instagram">
                <object class="pfp" data="/data/gallery/{account.id}.png" type="image/png" title="Profile">
                    <img src="/assets/pfp_placeholder.jpg" alt="Profile" />
                </object>
                <p class="nomargin username">{account.username}</p>
            </a>
        {/each}
    {:else}
        <p>No data</p>
    {/if}
    </div>
</Card>

<style lang="scss">
    @use "$lib/styles/vars.scss" as *;
    :global(.list){
        min-width: 300px;
    }
    .accounts{
        display: flex;
        flex-direction: column;
        overflow-x: auto;
        height: 100%;

        .account{
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px 0;
            border-bottom: 1px solid light-dark($layer-3-light, $layer-3-dark);
            cursor: pointer;
            text-decoration: none;
            
            .pfp, .pfp img{
                width: 30px;
                height: 30px;
                border-radius: 50%;
            }
            
            .username{
                color: $text-secondary;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
    }
</style>
