<script>
    import Icon from 'svelte-awesome';
    import {arrowDown, arrowUp} from 'svelte-awesome/icons';

    export let title;
    export let up = '';
    export let down = '';
</script>

<div class="screen" id={title}>
    <header>
        {#if up}
            <a href={`/#${up}`}>
                <Icon data={arrowUp} scale="2"/>
            </a>
        {/if}
        {#if down}
            <a href={`/#${down}`}>
                <Icon data={arrowDown} scale="2"/>
            </a>
        {/if}
        <h1>{title}</h1>
    </header>
    <div class="content">
        <slot/>
    </div>
</div>

<style lang="scss">
  @import "../variables";

  .screen {
    width: 100vw;
    height: 100vh;
    scroll-snap-align: center;
    scroll-snap-stop: always;
    padding: 12px;
    display: flex;
    flex-direction: column;
  }

  header {
    display: flex;
    flex-direction: row;
    align-items: center;

    a {
      color: $foreground;
      margin: 0 6px;
    }
  }

  .content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
