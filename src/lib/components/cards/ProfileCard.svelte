<script lang="ts">
    import { onMount } from "svelte";
    import Card from "../Card.svelte";
    import ListCard from "./ListCard.svelte";
    import type { Snapshot } from "$lib/backend/models";
    export let data: Snapshot;
</script>

<div class="header span4">
    <Card class="center profilecard">
        <object class="pfp" data="/data/accounts/{data?.account?.username}/pfp.jpg" type="image/jpeg" title="Profile">
            <img src="/assets/pfp_placeholder.jpg" alt="Profile" />
        </object>
        <div class="title">
            <p class="username nomargin">{data?.account?.username}</p>
            {#if data?.account?.verified}
                <img class="verified" src="/icons/verified.svg" alt="Verified account" />
            {/if}
        </div>
        <p class="desc nomargin">{data?.account?.biography}</p>
        <div class="details">
            <div class="group">
                <span>Followers</span>
                <p class="nomargin">{data?.followers?.length}</p>
            </div>
            <div class="group">
                <span>Following</span>
                <p class="nomargin">{data?.following?.length}</p>
            </div>
        </div>
    </Card>
    <ListCard title="Followers" data={data.followers} maxHeight={350} />
    <ListCard title="Following" data={data.following} maxHeight={350} />
</div>

<style lang="scss">
    @use "$lib/styles/vars.scss" as *;
    .header {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 40px;
    }
    :global(.profilecard) {
        width: 350px;
        min-width: 300px;
        flex-grow: 1;
        .pfp {
            border-radius: 50%;
            width: 200px;
            height: 200px;
            background-color: light-dark($layer-3-light, $layer-3-dark);

            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }

        .title {
            display: flex;
            align-items: center;
            gap: 5px;
            margin-top: 15px;
            margin-bottom: 5px;

            .username {
                color: CanvasText;
                font-weight: 600;
                font-size: 22px;
            }
            img.verified {
                width: 15px;
                height: 15px;
            }
        }

        .desc{
            text-align: center;
            color: $text-secondary;
            font-size: 15px;
        }
        .details {
            width: 100%;
            display: flex;
            justify-content: space-around;
            margin: 20px 0;
            .group {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;

                span {
                    color: $text-secondary;
                }

                p {
                    font-size: 28px;
                    font-weight: bold;
                }
            }
        }
    }
    :global(.list) {
        width: 30% !important;
        flex-grow: 1;
    }
</style>
