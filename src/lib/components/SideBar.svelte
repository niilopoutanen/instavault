<script>
    import { page } from "$app/stores";
    import Icon from "./Icon.svelte";
    import { getConfig } from "$lib/backend/config";
    import { beforeUpdate, onMount } from "svelte";
    export let accounts = [];

    let collapsed = false;
    let config;

    onMount(async () => {
        config = await getConfig($page.url.origin);
        collapsed = config.sidebarCollapsed;

        const handleResize = () => {
            if (window.innerWidth < 800) {
                if (!collapsed) {
                    collapsed = true;
                }
            } else {
                if (collapsed && !config.sidebarCollapsed) {
                    collapsed = false;
                }
            }
        };

        window.addEventListener("resize", handleResize);
    });
</script>

<div id="sidebar" class={collapsed ? "collapsed" : ""}>
    <a class="heading" href="/dashboard">
        <img src="/favicon.svg" alt="Logo" />
        <h1>InstaVault</h1>
    </a>

    <div class="section fullheight accounts scroll">
        <span class="title">Accounts</span>
        {#each accounts as account}
            <a
                class="account item"
                class:active={$page.url.pathname === `/dashboard/account/${account.username}`}
                href="/dashboard/account/{account.username}"
            >
                <img class="pfp circle" src="/data/accounts/{account.username}/pfp.jpg" alt="Profile" />
                <p class="name nomargin">{account.username}</p>
                {#if account.verified}
                    <img class="verified" src="/icons/verified.svg" alt="Verified account" />
                {/if}
            </a>
        {/each}
    </div>

    <div class="section">
        <span class="title">Tools</span>

        <a class="item" class:active={$page.url.pathname === `/dashboard/settings`} href="/dashboard/settings">
            <div class="circle">
                <Icon name="settings" width={"18px"} height={"18px"} />
            </div>
            <p class="name nomargin">Settings</p>
        </a>

        <a class="item" class:active={$page.url.pathname === `/dashboard/gallery`} href="/dashboard/gallery">
            <div class="circle">
                <Icon name="grid" width={"18px"} height={"18px"} />
            </div>
            <p class="name nomargin">Gallery</p>
        </a>
    </div>
    <div class="section">
        <a class="button secondary fullwidth center" href="/import/multi">
            <Icon name="plus" class="invert collapse" />
            <p class="nomargin">Import multiple</p>
        </a>
        <a class="button fullwidth center" href="/import">
            <Icon name="plus" class="invert collapse" />
            <p class="nomargin">Add new</p>
        </a>
    </div>
</div>

<style lang="scss">
    @use "$lib/styles/vars.scss" as *;
    #sidebar {
        view-transition-name: sidebar;

        min-width: 280px;
        height: 100%;
        background-color: light-dark($layer-2-light, $layer-2-dark);
        transition: min-width 0.2s;
        padding: 20px;
        box-sizing: border-box;

        display: flex;
        flex-direction: column;

        .heading {
            display: flex;
            align-items: center;
            text-decoration: none;
            color: CanvasText;
            gap: 10px;
            img {
                height: 40px;
                width: 40px;
            }
            h1 {
                font-size: 24px;
            }
        }

        .section {
            display: flex;
            flex-direction: column;
            margin-top: 20px;
            width: 100%;
            gap: 10px;
            .title {
                color: light-dark($text-secondary, $text-secondary);
                font-size: 14px;
                font-weight: 500;
            }
            :global(.icon.collapse) {
                display: none;
            }
            &.accounts{
                overflow-y: auto;
                flex-grow: 1;
            }
            .item {
                padding: 10px;
                border-radius: 10px;
                display: flex;
                align-items: center;
                gap: 10px;

                height: 50px;
                box-sizing: border-box;
                border: 2px solid transparent;
                text-decoration: none;
                color: CanvasText;

                &:hover {
                    border: 2px solid light-dark($layer-3-light, $layer-3-dark);
                }
                &.active {
                    background-color: light-dark($layer-3-light, $layer-3-dark);
                }

                .circle {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: light-dark($layer-3-light, $layer-3-dark);
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                }
                img.verified {
                    width: 15px;
                    height: 15px;
                    margin-left: -5px;
                }
                .name {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }

        &.collapsed {
            align-items: center;
            min-width: 80px;
            padding: 20px 10px;
            .heading {
                h1 {
                    display: none;
                }
            }
            .item {
                justify-content: center;
                .name {
                    display: none;
                }
            }
            .section {
                :global(.icon) {
                    display: inline;
                }
                .button p {
                    display: none;
                }
            }
        }
    }
</style>
