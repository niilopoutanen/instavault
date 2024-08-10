<script>
    export let title = "";
    export let padding = true;
    export let titleOverlay = false;
    let clazz = "";
    export { clazz as class };
</script>

<div class="card {clazz} {padding ? '' : 'nopadding title-overlay'} {titleOverlay ? 'title-overlay' : ''}">
    <div class="header">
        {#if title}
            <p class="title nomargin">{title}</p>
            <slot class="right" name="header"/>
        {/if}
    </div>

    <slot/>
</div>

<style lang="scss">
    @use "$lib/styles/vars.scss" as *;
    .card {
        border-radius: 10px;
        padding: 30px;
        box-sizing: border-box;
        background-color: light-dark($layer-2-light, $layer-2-dark);
        display: flex;
        flex-direction: column;

        .header {
            width: 100%;
            display: flex;
            :global(.title) {
                color: CanvasText;
                font-weight: 700;
                width: 100%;
                font-size: 20px;
                text-align: start;
                margin-bottom: 10px !important;
            }

            :global(.right){
                margin-left: auto;
                text-align: right;
            }
        }

        &.center {
            align-items: center;
        }
        &.nopadding {
            padding: 0;
        }

        &.title-overlay {
            position: relative;

            .header{
                position: absolute;
                left: 30px;
                top: 30px;
            }
        }
    }
</style>
