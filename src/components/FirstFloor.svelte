<script>
    import Screen from "./Screen.svelte";
    import Plant from "./Plant.svelte";
    import HueRoom from "./HueRoom.svelte";
</script>

<Screen title="Eerste Verdieping">
    <div class="floor">
        <div class="row">
            <div class="bath room">

            </div>
            <div class="bed room">

            </div>
        </div>
        <div class="row">
            <div class="office room">
                <Plant plantId="c47c8d678248" style="top: 40px"/>
                <Plant plantId="c47c8d677970" style="bottom: 0; right: 30px"/>
                <Plant plantId="c47c8d67ac50" style="bottom: 80px; right: 30px"/>
                <HueRoom roomId={1}/>
            </div>
            <div class="bed room">

            </div>
        </div>
    </div>
</Screen>

<style lang="scss">
  @import "../variables";

  .floor {
    display: flex;
    flex-direction: column;
  }

  .room {
    background-color: $panel;
    border-radius: 12px;
    position: relative;
  }

  .row {
    width: 1200px;
    display: flex;
    justify-content: space-between;

    &:first-child {
      height: 383px;
      margin-bottom: 19px;

      & > .bath.room {
        width: 387px;
      }

      & > .bed.room {
        width: 466px;
      }
    }

    &:nth-child(2) {
      height: 327px;

      & > .office.room {
        width: 505px;
      }

      & > .bed.room {
        width: 665px;
      }
    }
  }
</style>
