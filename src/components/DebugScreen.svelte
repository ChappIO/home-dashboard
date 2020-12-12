<script>
    import Screen from "./Screen.svelte";
    import {remoteState} from "../mqtt";

    $: state = $remoteState;

    let visible = "Refresh me";
</script>

<Screen title="Debug">
    <button on:click={() => {
        visible = JSON.stringify(state, null, 2);
    }}>
        Refresh
    </button>
    <pre>
        {visible}
    </pre>
</Screen>

<style>
    pre {
        height: 70vh;
        width: 50vw;
        overflow-y: scroll;
        font-family: monospace;
    }
</style>
