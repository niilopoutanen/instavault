<script lang="ts">
    import ProfileCard from "$lib/components/cards/ProfileCard.svelte";
    import ChartCard from "$lib/components/cards/ChartCard.svelte";
    import ListCard from "$lib/components/cards/ListCard.svelte";
    import Chips from "$lib/components/Chips.svelte";
    import { Period, Snapshot } from "$lib/backend/models";
    import UserActivityCard from "$lib/components/cards/UserActivityCard.svelte";
    import { writeValue } from "$lib/backend/config";
    import { onMount } from "svelte";
    import { beautifyDate } from "$lib/backend/utils";
    export let data: Snapshot;

    export let activePeriod: Period;

    $: {
        writeValue("lastActiveUser", data.account.username);
    }
    
</script>

<div class="grid">
    <div class="header span4">
        <ProfileCard {data} />
        <ListCard title="Followers" data={data.followers} maxHeight={350} />
        <ListCard title="Following" data={data.following} maxHeight={350} />
    </div>

    <div class="controls span4">
        <a href="/import/copy?username={data?.account?.username}" class="button layer-2 small nomargin">Import new data</a>
        <a href="https://instagram.com/{data?.account?.username}" target="_blank" class="button layer-2 small nomargin">View profile</a>
        <div class="expand"></div>
        <Chips bind:activePeriod/>
    </div>

    <ChartCard title="Followers" summary={data.summary} property={"followers"} period={activePeriod}/>

    <ChartCard title="Following" summary={data.summary} property={"following"} period={activePeriod}/>

    <UserActivityCard title="New followers" {activePeriod} summary={data.summary} />

    <UserActivityCard title="Unfollowers" {activePeriod} summary={data.summary} />

    <UserActivityCard title="New follows" {activePeriod} summary={data.summary} />

    <UserActivityCard title="Unfollows" {activePeriod} summary={data.summary} />

    <ListCard title="I don't follow back" data={data.iDontFollowBack} />

    <ListCard title="Don't follow me back" data={data.dontFollowMeBack} />

    <div class="details span4">
        <span>Last archived on: {beautifyDate(data?.summary[data.summary.length - 1]?.date)}</span>
        <span>Amount of snapshots: {data?.summary.length}</span>
        <span>First archive: {beautifyDate(data?.summary[0]?.date)}</span>
        <span>Now viewing from {beautifyDate(activePeriod?.from)} to {beautifyDate(activePeriod?.to)}</span>
    </div>
</div>

<style lang="scss">
    @use "$lib/styles/vars.scss" as *;
    .grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 40px;

        .header {
            display: flex;
            flex-direction: row;
            gap: 40px;

            :global(.list) {
                width: 100%;
            }
        }
        .controls {
            height: 30px;
            width: 100%;
            display: flex;
            gap: 10px;
        }
        .details{
            color: $text-secondary;
            font-size: 14px;
            display: flex;
            gap: 30px
        }
        :global(.span1) {
            grid-column: span 1;
        }

        :global(.span2) {
            grid-column: span 2;
        }

        :global(.span3) {
            grid-column: span 3;
        }

        :global(.span4) {
            grid-column: span 4;
        }
    }
</style>
