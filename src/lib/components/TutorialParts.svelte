<script lang="ts">
    import { onMount } from "svelte";
    import Swiper from "swiper";
    import { Navigation, Pagination, Autoplay } from "swiper/modules";

    import "swiper/css";
    import "swiper/css/navigation";
    import "swiper/css/pagination";

    let swiper;
    let videos = [
        {
            src: "/tutorials/open-console.mp4",
            title: "1. Open browser console"
        },
        {
            src: "/tutorials/goto-console.mp4",
            title: '2. Go to "Console" tab'
        },
        {
            src: "/tutorials/paste-code.mp4",
            title: '3. Paste the copied code into the console'
        },
        {
            src: "/tutorials/copy-result.mp4",
            title: '4. Wait for the script to finish and copy the result'
        },
    ];

    onMount(() => {
        swiper = new Swiper(".swiper", {
            modules: [Navigation, Pagination],
            centeredSlides: true,
            spaceBetween: 20,
            autoplay: {
                disableOnInteraction: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });

        const videoElements: NodeListOf<HTMLVideoElement> = document.querySelectorAll(".swiper-slide video");
        playVideo(videoElements[0]);

        swiper.on("activeIndexChange", (event) => {
            const index = event.activeIndex;
            const activeVideo = videoElements[index];

            playVideo(activeVideo);

            videoElements.forEach((video, videoIndex) => {
                if (videoIndex !== index) {
                    video.pause();
                }
            });
        });
    });

    function playVideo(video: HTMLVideoElement) {
        video.play();
        video.addEventListener("ended", () => {
            swiper.slideNext();
        });
    }
</script>

<swiper-container class="tutorial">
    <div class="swiper">
        <div class="swiper-wrapper">
            {#each videos as video}
                <div class="swiper-slide">
                    <video src={video.src} title={video.title} muted loop/>
                    <p class="title">{video.title}</p>
                </div>
            {/each}
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev swiper-button"></div>
        <div class="swiper-button-next swiper-button"></div>
    </div>
</swiper-container>

<style lang="scss">
    @use "$lib/styles/vars.scss" as *;
    .tutorial {
        width: 100%;
        height: auto;

        .swiper {
            width: 100%;
            height: 100%;
        }

        video {
            width: 100%;
            height: 300px;
            border-radius: 10px;
            object-fit: cover;
        }

        .title{
            color: $text-secondary;

            margin-top: 5px;
            margin-bottom: 0;
        }
        .desc{
            color: $text-secondary;
            margin: 0;
        }

        .swiper-button{
            --swiper-navigation-size: 15px;
            --swiper-navigation-color: #FFFFFF;
            background-color: #0000007c;
            padding: 5px;
            border-radius: 5px;
        }
    }
</style>
