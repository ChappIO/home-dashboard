<script>
    import ZolderFloor from "./components/ZolderFloor.svelte";
    import FirstFloor from "./components/FirstFloor.svelte";
    import BeganeGrond from "./components/BeganeGrond.svelte";
</script>

<main>
    <ZolderFloor/>
    <FirstFloor/>
    <BeganeGrond/>
</main>

<style lang="scss">
  @import "variables";

  :global(body) {
    background-color: $background;
  }

  main {
    scroll-snap-type: Y mandatory;
    height: 100vh;
    width: 100vw;
    overflow-y: scroll;

    & > :global(*) {
      scroll-snap-align: center;
      scroll-snap-stop: always;
    }
  }

  :global(h1,h2,h3,h4,h5,h6,p,pre) {
    color: $foreground;
  }
</style>
