<script>
    import Screen from "./Screen.svelte";
    import Plant from "./Plant.svelte";
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
                <Plant plantId="c47c8d677970"  style="bottom: -40px; right: 30px"/>
                <Plant plantId="c47c8d67ac50" style="bottom: 40px; right: 30px"/>
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
    width: 900px;
    display: flex;
    justify-content: space-between;

    &:first-child {
      height: 228px;
      margin-bottom: 19px;

      & > .bath.room {
        width: 291px;
      }

      & > .bed.room {
        width: 351px;
      }
    }

    &:nth-child(2) {
      height: 246px;

      & > .office.room {
        width: 380px;
      }

      & > .bed.room {
        width: 500px;
      }
    }
  }
</style>
