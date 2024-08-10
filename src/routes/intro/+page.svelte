<script>
    import { goto } from "$app/navigation";
    import Center from "$lib/components/Center.svelte";
    import * as rive from "@rive-app/canvas";
    import { onMount, getContext } from "svelte";

    let lockCanvas;
    onMount(() => {
        const r = new rive.Rive({
            src: "/assets/lock.riv",
            canvas: lockCanvas,
            autoplay: true,
            stateMachines: "State Machine 1",
            onLoad: () => {
                r.resizeDrawingSurfaceToCanvas();
            },
        });
    });
</script>

<Center>
    <div class="intro">
        <div id="logo">
            <canvas id="canvas" bind:this={lockCanvas}></canvas>
        </div>
        <h1 class="nomargin title">InstaVault</h1>
        <p class="nomargin desc">Archive and track your Instagram data.</p>
        <a class="button" href="/intro/how">Get started</a>
    </div>
</Center>

<style lang="scss">
    @use "$lib/styles/vars.scss" as *;

    .intro {
        display: flex;
        flex-direction: column;
        align-items: center;
        h1.title {
            font-size: 3rem;
            margin-bottom: 10px !important;
        }
        p.desc {
            color: $text-secondary;
            margin-bottom: 50px !important;
        }
        #logo {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 300px;
            height: 300px;
            position: relative;

            #canvas {
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                z-index: 2;
            }
        }
    }
</style>
