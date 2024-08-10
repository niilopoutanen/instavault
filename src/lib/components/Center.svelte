<div class="center">
    <div class="content">
        <slot/>
    </div>
</div>

<style lang="scss">
    @use "$lib/styles/vars.scss" as *;
    .center {
        width: 100%;
        height: 100%;
        min-height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: light-dark($layer-1-light, $layer-1-dark);

        .content {
            width: 100%;
            max-width: 450px;
            height: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 20px;
            box-sizing: border-box;
        }
    }
</style>
