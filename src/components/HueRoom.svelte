<script>
    import {derived} from "svelte/store";
    import {remoteState} from "../mqtt";
    import Icon from 'svelte-awesome';
    import {lightbulbO} from 'svelte-awesome/icons';
    import {longpress} from "../longpress";

    export let roomId;
    export let style = '';

    let baseUrl = derived(remoteState, state => state.data?.hue?.bridge?.baseUrl);
    let room;
    let scenes = [];
    let showScenes = false;
    let veerleModeActive = false;
    $: isOn = !!room?.state?.any_on;

    $: if ($baseUrl && !room) {
        refresh();
    }

    async function refresh() {
        const response = await fetch(`${$baseUrl}/groups/${roomId}`);
        room = await response.json();

        const scenesResponse = await fetch(`${$baseUrl}/scenes`);
        const discoveredScenes = await scenesResponse.json();
        scenes = Object.entries(discoveredScenes).filter(([key, value]) => {
            return value.group === `${roomId}`;
        }).map(([key, value]) => ({id: key, ...value}));
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

    async function handleTap() {
        if (!showScenes) {
            await toggleLight();
        }
    }

    function handleLongPress() {
        showScenes = true;
    }

    async function selectScene(scene) {
        showScenes = false;
        console.debug(`Enabling ${scene.name}`);
        await fetch(`${$baseUrl}/groups/${roomId}/action`, {
            method: 'PUT',
            body: JSON.stringify({
                scene: scene.id,
            })
        });
        await refresh();
    }

    async function veerleMode() {
        if (veerleModeActive) {
            return;
        }
        veerleModeActive = true;
        try {
            const lights = room.lights.map(light => `${$baseUrl}/lights/${light}/state`);
            // save state for later
            const lightsState = await Promise.all(lights.map(
                light => fetch(light.substring(0, light.length - '/state'.length))
                    .then(r => r.json())
                    .then(state => ({url: light, ...state}))
            ));

            // full brightness!
            await Promise.all(lights.map((light) => fetch(
                light,
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        bri: 254,
                        sat: 254,
                        on: true,
                        transitiontime: 0,
                    })
                }
            )));

            for (let i = 0; i < 20; i++) {
                await Promise.all(lights.map((light) => fetch(
                    light,
                    {
                        method: 'PUT',
                        body: JSON.stringify({
                            hue_inc: Math.floor(Math.random() * 30000 + 15000),
                            transitiontime: 0,
                        })
                    }
                )));
            }
            // restore state
            await Promise.all(lightsState.map(light => {
                let settings = {};

                switch (light.state.colormode) {
                    case 'ct':
                        settings = {
                            ct: light.state.ct
                        }
                        break;
                    case 'hs':
                        settings = {
                            hue: light.state.hue,
                            sat: light.state.sat,
                        }
                        break;
                    case 'xy':
                        settings = {
                            xy: light.state.xy
                        }
                        break;
                }
                return fetch(light.url, {
                    method: 'PUT',
                    body: JSON.stringify({
                        on: light.state.on,
                        bri: light.state.bri,
                        ...settings
                    })
                });
            }));
        } finally {
            veerleModeActive = false;
        }
    }
</script>

<div class="room light {isOn ? 'on' : 'off'} {showScenes ? 'show-scenes' : ''}"
     style="{style}">
    <div class="veerle" on:click={veerleMode}>
        V
    </div>
    <div class="button"
         on:click={handleTap}
         use:longpress
         on:longpress={handleLongPress}>
        <Icon data={lightbulbO} scale={2}/>
    </div>
    <div class="scenes">
        {#each scenes as scene}
            <div class="scene" on:click={() => selectScene(scene)}>
                <div class="enable">
                    <Icon data={lightbulbO}/>
                </div>
                <span>{scene.name}</span>
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
  @import "../variables";

  .room.light {
    width: 60px;
    height: 60px;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    position: absolute;

    .veerle {
      background-color: $secondary;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      color: $foreground;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: -15px;
      right: -15px;
      cursor: pointer;
    }

    .button {
      width: 100%;
      height: 100%;
      cursor: pointer;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    :global(svg) {
      fill: white;
    }

    &.on .button {
      background-color: $primary;
    }

    &.off .button {
      background-color: $background;
    }

    &:not(.show-scenes) .scenes {
      display: none;
    }

    .scenes {
      position: absolute;
      margin: auto;
      top: 0;
      right: 0;
      transform: translateY(-50%);

      .scene {
        color: $foreground;
        cursor: pointer;
        padding: 3px 6px;
        margin: 3px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .enable {
          background-color: $primary;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 3px;
        }

        span {
          text-align: center;
        }
      }

      .scene {
        right: -12px;
        transform: translateX(100%);
      }

    }
  }
</style>