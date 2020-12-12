<script>
    export let value = -1;
    export let min = Number.MIN_VALUE;
    export let max = Number.MAX_VALUE;
    export let unit = '';
</script>

{#if value > max}
    <div class="high stat" data-tooltip="{value} > {max}">
        {value} {unit}
    </div>
{:else if value < min}
    <div class="low stat" data-tooltip="{value} < {min}">
        {value} {unit}
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
