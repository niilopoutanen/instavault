<script>
    import { onMount } from "svelte";

    let container;
    export function displayNotification(text) {
        const notificationCount = container.childNodes.length;
        if (notificationCount > 3) {
            removeLast();
        }

        const notification = document.createElement("div");
        notification.classList.add("notification");
        notification.innerHTML = `<p class="nomargin">${text}</p>`;
        document.getElementById("notification-container").appendChild(notification);

        setTimeout(() => {
            notification.classList.add("disappear");
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    }

    function removeLast() {
        const notification = container.childNodes[0];
        notification.classList.add("disappear");
        setTimeout(() => {
            notification.remove();
        }, 500);
    }
</script>

<div bind:this={container} id="notification-container"></div>

<style lang="scss">
    #notification-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        z-index: 10;

        position: fixed;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        padding-top: 10px;

        :global(.notification) {
            min-width: 200px;
            border-radius: 1000px;
            padding: 20px 40px;
            background-color: light-dark(#0000000e, #ffffff0e);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;

            transform: translateY(-100%);
            animation: appear 0.5s forwards;
        }
        :global(.notification.disappear) {
            animation: disappear 0.5s forwards;
        }
    }

    @keyframes appear {
        from {
            opacity: 0;
            transform: translateY(-100%);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes disappear {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-100%);
        }
    }
</style>
