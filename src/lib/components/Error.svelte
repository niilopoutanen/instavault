<script>
    export let msg;
</script>

{#if msg}
    <span class="error">{msg}</span>
{:else}
    <div class="temp"></div>
{/if}

<style lang="scss">
    .error {
        color: red;
        animation: bounce 1s forwards;
    }
    .temp,
    .error {
        height: 20px;
    }
    @keyframes bounce {
        0% {
            opacity: 0;
            transform: scale(100%);
        }
        40%,
        80% {
            opacity: 1;
            transform: scale(100%);
        }
        20%,
        60% {
            transform: scale(108%);
        }
    }
</style>
