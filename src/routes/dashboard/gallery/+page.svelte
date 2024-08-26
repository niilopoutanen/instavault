<script>
    import { onMount } from "svelte";

    let pfps = [];

    onMount(async () => {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        if (data != null) {
            pfps = data;
        }
    });
</script>

<div class="header">
    <h1 class="nomargin">Gallery</h1>
    <a class="margin-left button" href="/import/pfps">Import new data</a>
</div>

<div class="gallery">
    {#if pfps != null && pfps.length > 0}
        {#each pfps as pfp}
            <div class="profile">
                <img src={pfp} alt="Profile" />
            </div>
        {/each}
    {:else}
        <p>No profile pictures saved.</p>
    {/if}
</div>

<style lang="scss">
    .header{
        display: flex;

        .button{
            margin-left: auto;
        }
    }
    .gallery {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        .profile {
            width: 100px;
            height: 100px;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 50%;
            }
        }
    }
</style>
