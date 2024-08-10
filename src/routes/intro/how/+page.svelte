<script>
    import { writeValue } from "$lib/backend/config";
    import { goto } from "$app/navigation";
    import Center from "$lib/components/Center.svelte";
    import Accordion from "$lib/components/Accordion.svelte";
    function next() {
        writeValue("introDone", true);
        goto("/dashboard");
    }

    const accordionItems = [
        {
            title: "Is my login info saved?",
            content: "No. Login info is never asked, and never saved. The data is retrieved from the browser console.",
        },
        {
            title: "Why is there no option to save login info?",
            content:
                "In order to do that, you would need to disable 2FA. That is not a good way, and that is why we don't do it.",
        },
        {
            title: "Is there a limit for amount of data saved?",
            content:
                "Theoretically, no. But the more data you save, the slower the app will be. The more followers you have, the longer it takes to retrieve them.",
        },
        {
            title: "How do I delete my data?",
            content: "Remove the app folder. The data is not saved anywhere else.",
        },
        {
            title: "Can i get banned for tracking my followers?",
            content: `Maybe, maybe not. Probably not. So far no accounts have been banned for using this app.
            This might change if Instagram changes something, who knows. Use at your own risk.`,
        },
        {
            title: "What accounts can i track?",
            content: "Any account where you can see their followers. You must follow private accounts to see their followers. Public accounts can be tracked always.",
        }
    ];
</script>

<Center>
    <h1>How does InstaVault work?</h1>

    <Accordion items={accordionItems} />

    <button class="button" on:click={next}>Alright</button>
</Center>
