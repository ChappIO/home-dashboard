<script>
    import {remoteState} from "../mqtt";
    import {derived} from "svelte/store";
    import PlantStat from "./PlantStat.svelte";

    export let plantId;
    export let style = '';

    const plant = derived(remoteState, state => state?.data?.miflora?.[plantId]);
</script>

<div class="plant" style="{style}">
    <img src="{$plant?.image}" alt="{$plant?.name}"/>
    <div class="stats">
        <PlantStat {...$plant?.battery}/>
        <PlantStat {...$plant?.moisture}/>
        <PlantStat {...$plant?.luminosity}/>
    </div>
</div>

<style lang="scss">
  .plant {
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    width: 0;
    z-index: 1;

    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }

    .stats {
      display: flex;
      flex-direction: row;
    }
  }
</style>
