<script>
    import Screen from "./Screen.svelte";
</script>

<Screen title="Zolder">
    <div class="floor">
        <div class="parts">
            <div class="segment">

            </div>
            <div class="segment">

            </div>
        </div>
        <div class="room">

        </div>
    </div>
</Screen>

<style lang="scss">
  @import "../variables";

  .segment, .room {
    background-color: $panel;
  }

  .parts {
    display: flex;
    justify-content: space-between;
  }

  .segment {
    height: 150px;
    width: 320px;
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;
  }

  .room {
    width: 900px;
    height: 384px;
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
  }
</style>
