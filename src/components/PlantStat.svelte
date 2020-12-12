<script>
    import Icon from 'svelte-awesome';

    export let value = -1;
    export let min = Number.MIN_VALUE;
    export let max = Number.MAX_VALUE;
    export let unit = '';
    export let icon;
</script>

{#if value > max}
    <div class="high stat" data-tooltip="{value} > {max}">
        <Icon data={icon} /> {value} {unit}
    </div>
{:else if value < min}
    <div class="low stat" data-tooltip="{value} < {min}">
        <Icon data={icon} /> {value} {unit}
    </div>
{/if}

<style lang="scss">
  @import "../variables";

  .stat {
    background-color: $background;
    color: $foreground;
    padding: 3px 6px;
    border-radius: 3px;
    margin: 3px;
    white-space: nowrap;
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;

    & > :global(svg) {
      margin-right: 6px;
    }

    &:after {
      content: attr(data-tooltip);
      position: absolute;
      bottom: -40px;
      padding: 6px;
      left: 50%;
      transform: translateX(-50%);
      display: none;
    }

    &:hover:after {
      display: block;
    }

    &.low {
      box-shadow: 0 0 10px $primary;

      &:after {
        background-color: $primary;
      }
    }

    &.high {
      box-shadow: 0 0 10px $secondary;

      &:after {
        background-color: $secondary;
      }
    }
  }
</style>
