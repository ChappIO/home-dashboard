<script>
    import ZolderFloor from "./components/ZolderFloor.svelte";
    import FirstFloor from "./components/FirstFloor.svelte";
    import BeganeGrond from "./components/BeganeGrond.svelte";
    import {onMount} from "svelte";

    let page = window.location.hash.substring(1);

    onMount(() => {
        return window.addEventListener('hashchange', (e) => {
            page = new URL(e.newURL).hash.substring(1);
        })
    });
</script>

{#if page === 'zolder'}
    <ZolderFloor/>
{:else if page === 'first'}
    <FirstFloor/>
{:else if page === 'ground'}
    <BeganeGrond/>
{/if}

<style lang="scss">
  @import "variables";

  :global(body) {
    background-color: $background;
    height: 100vh;
    width: 100vw;
    scroll-snap-type: y mandatory;
  }

  :global(h1,h2,h3,h4,h5,h6,p,pre) {
    color: $foreground;
  }
</style>
