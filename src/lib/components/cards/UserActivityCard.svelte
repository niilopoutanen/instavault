<script lang="ts">
    import Card from "../Card.svelte";
    import { beautifyDate } from "$lib/backend/utils";
    import { Period, Summary } from "$lib/backend/models";
    import { onMount } from "svelte";
    import { getConfig } from "$lib/backend/config";
    import { page } from "$app/stores";

    export let title: string;
    export let activePeriod: Period;
    export let summary: Summary[];

    let changedAccounts = [];
    let config = null;

    $: activePeriod, summary, calculateChanges();

    function calculateChanges() {
        if (!summary) return;

        changedAccounts = [];
        for (let i = 0; i < summary.length; i++) {
            if (!activePeriod) continue;

            const summaryDate: Date = new Date(summary[i].date);
            if (summaryDate < activePeriod.from) continue;

            if (summary[i][getFieldName()].length > 0) {
                for (const account of summary[i][getFieldName()]) {
                    changedAccounts.push({
                        username: account.username,
                        id: account.id,
                        date: summary[i].date,
                    });
                }
            }
        }
        changedAccounts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    function getFieldName() {
        switch (title) {
            case "New followers":
                return "newfollowers";
            case "New follows":
                return "newfollows";
            case "Unfollowers":
                return "unfollowers";
            case "Unfollows":
                return "unfollows";
        }
    }
    onMount(async () => {
        config = await getConfig($page.url.origin);
    })
</script>

<Card {title} class="span2">
    <p slot="header" class="title nomargin right">{changedAccounts.length.toString()}</p>
    <div class="accounts scroll">
        {#each changedAccounts as account}
            <a class="account" href="https://instagram.com/{account.username}" target="_blank" title="Click to open account in Instagram">
                {#if config != null && config.showPfpsInDashboard}
                    <img 
                        class="pfp" 
                        src={`/data/gallery/${account.id}.png`} 
                        alt="Profile" 
                        on:error={(event) => event.target.src = '/assets/pfp_placeholder.jpg'}
                    />
                {/if}
                <p class="nomargin username">{account.username}</p>
                <p class="date">{beautifyDate(account.date)}</p>
            </a>
        {/each}
        {#if changedAccounts.length === 0}
            <div class="account">
                <p class="nomargin username">No new changes on selected period.</p>
            </div>
        {/if}
    </div>
</Card>

<style lang="scss">
    @use "$lib/styles/vars.scss" as *;
    .accounts {
        display: flex;
        flex-direction: column;
        overflow-x: auto;
        max-height: 300px;

        .account {
            display: flex;
            align-items: center;
            padding: 10px 0;
            border-top: 1px solid light-dark($layer-3-light, $layer-3-dark);
            text-decoration: none;
            cursor: pointer;

            .pfp, .pfp img{
                width: 30px;
                height: 30px;
                border-radius: 50%;
                margin-right: 10px;
            }

            .username {
                color: $text-secondary;
            }
            .date {
                margin-left: auto !important;
                color: $text-secondary;
                margin-right: 5px;
                margin: auto 10px 0 0;
            }
        }
    }
</style>
