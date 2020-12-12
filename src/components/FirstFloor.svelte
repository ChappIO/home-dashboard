<script>
    import Screen from "./Screen.svelte";
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
