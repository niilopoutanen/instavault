<script>
    import emblaCarouselSvelte from "embla-carousel-svelte";
</script>

<div class="embla tutorial" use:emblaCarouselSvelte>
    <div class="embla__container">
        <video class="embla__slide" src="https://w3schools.com/html/mov_bbb.mp4" autoplay> </video>
        <video class="embla__slide" src="https://w3schools.com/html/mov_bbb.mp4" autoplay> </video>
        <video class="embla__slide" src="https://w3schools.com/html/mov_bbb.mp4" autoplay> </video>
    </div>
</div>

<style lang="scss">
    .tutorial {
        width: 100%;
        height: 300px;

        video {
            width: 100%;
            height: 100%;
            border-radius: 10px;
            object-fit: cover;
        }
    }
</style>
