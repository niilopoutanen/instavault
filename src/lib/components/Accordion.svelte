<script>
    export let items = [];
    let openIndex = -1;

    const toggle = (index) => {
        openIndex = openIndex === index ? -1 : index;
    };
</script>

<div class="accordion">
    {#each items as item, index}
        <div class="item">
            <button class="header" on:click={() => toggle(index)}>
                {item.title}
            </button>
            <div class="body {openIndex === index ? 'open' : ''}">
                <div>{item.content}</div>
            </div>
        </div>
    {/each}
</div>

<style lang="scss">
    @use '$lib/styles/vars.scss' as *;
    .accordion {
        width: 100%;
        border: 1px solid light-dark($layer-3-light, $layer-3-dark);
        border-radius: 5px;
        overflow: hidden;

        .item {
            border-bottom: 1px solid light-dark($layer-3-light, $layer-3-dark);
        }

        .header {
            background: light-dark($layer-2-light, $layer-2-dark);
            padding: 1rem;
            cursor: pointer;
            font-weight: bold;

            outline: none;
            border: none;
            width: 100%;
            font-size: 15px;
            text-align: left;
        }

        .body {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), padding 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            padding: 0 1rem;
        }

        .body.open {
            max-height: 200px;
            padding: 1rem;
        }
    }
</style>