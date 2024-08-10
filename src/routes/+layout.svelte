<script>
    import "$lib/styles/base.scss";
    import "$lib/styles/text.scss";
    import "$lib/styles/fields.scss";

    import { onNavigate } from "$app/navigation";
    import Notification from "$lib/components/Notification.svelte";
    import { onMount } from "svelte";

    let notifications;
    onNavigate((navigation) => {
        if (!document.startViewTransition) return;

        return new Promise((resolve) => {
            document.startViewTransition(async () => {
                resolve();
                await navigation.complete;
            });
        });
    });

    onMount(() => {
        window.addEventListener('displayNotification', event => {
            notifications.displayNotification(event.detail);
        });
    });
    
    
</script>
<svelte:head>
    <title>InstaVault - Get started</title>
</svelte:head>

<Notification bind:this={notifications}/>
<slot />


<style lang="scss">
    :root{
        color-scheme: light dark;
    }
    @keyframes fade-in {
        from {
            opacity: 0;
        }
    }

    @keyframes fade-out {
        to {
            opacity: 0;
        }
    }

    @keyframes slide-from-right {
        from {
            transform: translateX(30px);
        }
    }

    @keyframes slide-to-left {
        to {
            transform: translateX(-30px);
        }
    }

    :root::view-transition-old(root) {
        animation:
            90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
            300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
    }

    :root::view-transition-new(root) {
        animation:
            210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
            300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
    }
</style>
