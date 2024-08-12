<script lang="ts">
    import ProfileCard from "$lib/components/cards/ProfileCard.svelte";
    import ChartCard from "$lib/components/cards/ChartCard.svelte";
    import ListCard from "$lib/components/cards/ListCard.svelte";
    import Chips from "$lib/components/Chips.svelte";
    import { Period, Snapshot } from "$lib/backend/models";
    import UserActivityCard from "$lib/components/cards/UserActivityCard.svelte";
    import { writeValue } from "$lib/backend/config";
    import { beautifyDate } from "$lib/backend/utils";
    import { page } from "$app/stores";
    export let data: Snapshot;

    export let activePeriod: Period;

    $: {
        writeValue("lastActiveUser", data?.account?.username, $page.url.origin);
    }
</script>

<div class="grid">
    <ProfileCard {data} />

    <div class="controls span4">
        <a href="/import/copy?username={data?.account?.username}" class="button layer-2 small nomargin">Import new data</a>
        <a href="https://instagram.com/{data?.account?.username}" target="_blank" class="button layer-2 small nomargin">View profile</a>
        <div class="expand"></div>
        <Chips bind:activePeriod />
    </div>

    <ChartCard title="Followers" summary={data.summary} property={"followers"} period={activePeriod} />

    <ChartCard title="Following" summary={data.summary} property={"following"} period={activePeriod} />

    <UserActivityCard title="New followers" {activePeriod} summary={data.summary} />

    <UserActivityCard title="Unfollowers" {activePeriod} summary={data.summary} />

    <UserActivityCard title="New follows" {activePeriod} summary={data.summary} />

    <UserActivityCard title="Unfollows" {activePeriod} summary={data.summary} />

    <ListCard title="I don't follow back" data={data.iDontFollowBack} />

    <ListCard title="Don't follow me back" data={data.dontFollowMeBack} />

    <div class="details span4">
        <span>Last archived on: {beautifyDate(data?.summary[data?.summary?.length - 1]?.date)}</span>
        <span>Amount of snapshots: {data?.summary?.length}</span>
        <span>First archive: {beautifyDate(data?.summary[0]?.date)}</span>
        <span>Now viewing from {beautifyDate(activePeriod?.from)} to {beautifyDate(activePeriod?.to)}</span>
    </div>
</div>

<style lang="scss">
    @use "$lib/styles/vars.scss" as *;
    .grid {
        display: flex;
        flex-wrap: wrap;
        gap: 40px;

        .controls {
            height: 30px;
            width: 100%;
            display: flex;
            gap: 10px;
        }
        .details {
            color: $text-secondary;
            font-size: 14px;
            display: flex;
            flex-wrap: wrap;
            gap: 20px 30px;
        
        }
        :global(.span1) {
            width: calc(25% - 20px);
        }

        :global(.span2) {
            width: calc(50% - 20px);
        }

        :global(.span3) {
            width: calc(75% - 20px);
        }

        :global(.span4) {
            width: 100%;
        }

        @media screen and (max-width: 1200px) {
            :global(.span1) {
                width: 100%;
            }

            :global(.span2) {
                width: 100%;
            }

            :global(.span3) {
                width: 100%;
            }

            :global(.span4) {
                width: 100%;
            }
        }
    }
</style>
