<script>
    import ZolderFloor from "./components/ZolderFloor.svelte";
    import FirstFloor from "./components/FirstFloor.svelte";
    import BeganeGrond from "./components/BeganeGrond.svelte";
</script>

    <ZolderFloor/>
    <FirstFloor/>
    <BeganeGrond/>

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
