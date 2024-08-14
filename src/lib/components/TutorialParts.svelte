<script>
    import { onMount } from "svelte";
    import Swiper from "swiper";
    import { Navigation, Pagination, Autoplay } from "swiper/modules";

    import "swiper/css";
    import "swiper/css/navigation";
    import "swiper/css/pagination";

    let swiper;

    onMount(() => {
        swiper = new Swiper(".swiper", {
            modules: [Navigation, Pagination],
            centeredSlides: true,
            spaceBetween: 20,
            autoplay: {
                disableOnInteraction: true,
            },
        });

        const videos = document.querySelectorAll(".swiper-slide video");
        playVideo(videos[0]);

        swiper.on("activeIndexChange", (event) => {
            const index = event.activeIndex;
            const activeVideo = videos[index];

            playVideo(activeVideo);

            videos.forEach((video, videoIndex) => {
                if (videoIndex !== index) {
                    video.pause();
                }
            });
        });
    });

    function playVideo(video) {
        video.play();
        video.addEventListener("ended", () => {
            swiper.slideNext();
        });
    }
</script>

<swiper-container class="tutorial">
    <div class="swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <video src="https://w3schools.com/html/mov_bbb.mp4" title="1" muted></video>
            </div>
            <div class="swiper-slide">
                <video src="https://w3schools.com/html/mov_bbb.mp4" title="2" muted></video>
            </div>
            <div class="swiper-slide">
                <video src="https://w3schools.com/html/mov_bbb.mp4" title="3" muted></video>
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</swiper-container>

<style lang="scss">
    .tutorial {
        width: 100%;
        height: 300px;

        .swiper {
            width: 100%;
            height: 100%;
        }

        video {
            width: 100%;
            height: 100%;
            border-radius: 10px;
            object-fit: cover;
        }
    }
</style>
