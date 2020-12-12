<script>
    import Icon from 'svelte-awesome';

    export let value = -1;
    export let min = Number.MIN_VALUE;
    export let max = Number.MAX_VALUE;
    export let unit = '';
    export let icon;
</script>

{#if value > max}
    <div class="high stat" data-tooltip="{value} > {max} {unit}">
        <Icon data={icon} />
    </div>
{:else if value < min}
    <div class="low stat" data-tooltip="{value} < {min} {unit}">
        <Icon data={icon} />
    </div>
{/if}

<style lang="scss">
  @import "../variables";

  .stat {
    color: $foreground;
    padding: 3px 6px;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    margin: -15px 3px;
    white-space: nowrap;
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

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
      background-color: $primary;
      &:after {
        background-color: $primary;
      }
    }

    &.high {
      background-color: $secondary;
      &:after {
        background-color: $secondary;
      }
    }
  }
</style>
