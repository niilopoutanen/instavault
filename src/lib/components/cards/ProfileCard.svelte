<script>
    import { onMount } from "svelte";
    import Card from "../Card.svelte";
    export let data;

</script>
<Card class="center profilecard">
    <object class="pfp" data="/data/{data?.account?.username}/pfp.jpg" type="image/jpeg" title="Profile">
        <img src="/assets/pfp_placeholder.jpg" alt="Profile"/>
    </object>
    <p class="username">{data?.account?.username}</p>
    <div class="details">
        <div class="group">
            <span>Followers</span>
            <p class="nomargin">{data?.followers?.length}</p>
        </div>
        <div class="group">
            <span>Following</span>
            <p class="nomargin">{data?.following?.length}</p>
        </div>
    </div>
</Card>


<style lang="scss">
    @use "$lib/styles/vars.scss" as *;
    :global(.profilecard){
        width: 350px;
        min-width: 300px;
        .pfp{
            border-radius: 50%;
            width: 200px;
            height: 200px;
            background-color: light-dark($layer-3-light, $layer-3-dark);

            img{
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }

        .username{
            color: CanvasText;
            font-weight: 600;
            font-size: 22px;
        }
        .details{
            width: 100%;
            display: flex;
            justify-content: space-around;
            margin: 20px 0;
            .group{
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;

                span{
                    color: $text-secondary;
                }

                p{
                    font-size: 28px;
                    font-weight: bold;
                }
            }
        }
    }
</style>