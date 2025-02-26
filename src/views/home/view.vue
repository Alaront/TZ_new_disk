<script setup lang="ts">

</script>

<template>
  <div class="home">
    <div class="home__text">
      <h1>Мои <br /> заметки</h1>
      <p>Не забывай о важном, храни его в облаке.</p>
    </div>
    <div class="home__photo">
      <img src="/src/assets/img/photo/dashboard.svg" alt="main-photo" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  flex: 1;
  //max-width: 320px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media(min-width: $desktop) {
    flex-direction: row;
    width: calc(100% - 40px);
    max-width: 1600px;
  }

  &__text {
    margin-bottom: 17px;

    h1 {
      @include h1-mob;
      text-align: center;
      margin-bottom: 20px;
      color: $white-color;
    }

    p {
      @include h3-mob;
      text-align: center;
      color: $gray-color;
    }

    @media(min-width: $tablet) {
      margin: 0;

      h1 {
        @include h1;
      }

      p {
        @include h3;
      }
    }

    @media(min-width: $desktop) {
      max-width: 579px;

      h1 {
        margin-bottom: 40px;
        text-align: left;
      }

      p {
        text-align: left;
      }
    }
  }

  &__photo {
    width: 298px;
    object-fit: contain;

    @media(min-width: $tablet) {
      width: 561px;
    }

    @media(min-width: $desktop) {
      width: 628px;
      align-self: end;
    }

    @media(min-width: $desktop_full) {
      width: 867px;
    }
  }
}
</style>
