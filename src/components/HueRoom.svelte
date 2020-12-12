<script>
    import {derived} from "svelte/store";
    import {remoteState} from "../mqtt";
    import Icon from 'svelte-awesome';
    import {lightbulbO} from 'svelte-awesome/icons';

    export let roomId;
    export let style = '';

    let baseUrl = derived(remoteState, state => state.data?.hue?.bridge?.baseUrl);
    let room;
    $: isOn = !!room?.state?.any_on;

    $: if ($baseUrl && !room) {
        refresh();
    }

    async function refresh() {
        const response = await fetch(`${$baseUrl}/groups/${roomId}`);
        room = await response.json();
    }

    async function toggleLight() {
        await fetch(`${$baseUrl}/groups/${roomId}/action`, {
            method: 'PUT',
            body: JSON.stringify({
                on: !isOn,
            })
        });
        await refresh();
    }
</script>

<div class="room light {isOn ? 'on' : 'off'}" style="{style}" on:click={toggleLight}>
    <Icon data={lightbulbO} scale={2}/>
</div>

<style lang="scss">
  @import "../variables";

  .room.light {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    position: absolute;
    cursor: pointer;

    :global(svg) {
      fill: white;
    }

    &.on {
      background-color: $primary;
    }

    &.off {
      background-color: $background;
    }
  }
</style>
