<script>
    import { onMount } from "svelte";
    export let data;
    $: data.summary.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());


    function getFolder(date) {
        let d = new Date(date);
        const year = d.getFullYear();
        const month = (d.getMonth() + 1).toString().padStart(2, "0");
        const day = d.getDate().toString().padStart(2, "0");

        const hours = d.getHours().toString().padStart(2, '0');
        const minutes = d.getMinutes().toString().padStart(2, '0');
        return `${year}-${month}-${day}/${hours}-${minutes}`;
    }
    function formatDate(date){
        let d = new Date(date);
        const year = d.getFullYear();
        const month = (d.getMonth() + 1).toString().padStart(2, "0");
        const day = d.getDate().toString().padStart(2, "0");

        const hours = d.getHours().toString().padStart(2, '0');
        const minutes = d.getMinutes().toString().padStart(2, '0');

        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }
</script>

<h1>Profile picture history of {data.account.username}</h1>
<div class="history">
    {#each data.summary as point}
    {#if point.hasPFP}
    <div class="point">
        <p>{formatDate(point.date)}</p>
        <a class="pfp" href="/data/accounts/{data.account.username}/{getFolder(point.date)}/pfp.jpg">
            <img loading="lazy" src="/data/accounts/{data.account.username}/{getFolder(point.date)}/pfp.jpg" alt="Profile" />
        </a>
    </div>

    {/if}
{/each}
</div>
<p>No more images to show.</p>



<style lang="scss">
    @use "$lib/styles/vars.scss" as *;
    .history{
        display: flex;
        flex-direction: column;

        .point{
            display: flex;
            flex-direction: column;
            border-bottom: 2px solid light-dark($layer-2-light, $layer-2-dark);
            padding: 20px 0;
            a.pfp{
                max-width: 100%;
                width: 200px;
                height: auto;

                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>