<script>
    import Screen from "./Screen.svelte";
</script>

<Screen title="Begane Grond">
    <div class="floor">
        <div class="column">
            <div class="bath room"></div>
            <div class="hall room"></div>
            <div class="living room"></div>
        </div>
        <div class="column">
            <div class="hall room"></div>
            <div class="living room"></div>
        </div>
        <div class="column">
            <div class="stairs"></div>
            <div class="hall room"></div>
            <div class="living room"></div>
        </div>
        <div class="column">
            <div class="stairs"></div>
            <div class="living room"></div>
        </div>
        <div class="column">
            <div class="living room"></div>
        </div>
    </div>
</Screen>

<style lang="scss">
  @import "../variables";

  .floor {
    display: flex;
    flex-direction: row;
  }

  .room {
    background-color: $panel;
  }

  .column {
    display: flex;
    flex-direction: column;
    height: 540px;

    &:nth-child(1) {
      width: 123px;

      .bath.room {
        height: 93px;
        margin-bottom: 7px;
        margin-right: 7px;
        border-radius: 12px;
      }

      .hall.room {
        margin-bottom: 7px;
        height: 142px;
        border-top-left-radius: 12px;
        border-bottom-left-radius: 12px;
      }

      .living.room {
        border-top-left-radius: 12px;
        border-bottom-left-radius: 12px;
      }
    }

    &:nth-child(2) {
      width: 115px;

      .hall.room {
        margin-bottom: 7px;
        height: 242px;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
      }
    }

    &:nth-child(3) {
      width: 180px;

      .stairs {
        height: 127px;
      }

      .hall.room {
        height: 115px;
        margin-bottom: 7px;
      }
    }

    &:nth-child(4) {
      width: 130px;

      .stairs {
        height: 127px;
      }
    }

    &:nth-child(5) {
      width: 351px;

      .living.room {
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
        border-bottom-right-radius: 12px;
      }
    }
  }

  .living.room {
    flex-grow: 1;
  }
</style>
