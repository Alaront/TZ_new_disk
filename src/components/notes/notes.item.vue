<script setup lang="ts">
  import {IconClose} from "../../uikit/icon";

  interface Props {
    title: string,
    text: string,
    id: number
  }

  interface Emit {
    (e: 'remove-item', id: number): void
  }

  defineProps<Props>()
  const emits = defineEmits<Emit>()

</script>

<template>
  <section class="notes-item">
    <div class="notes-item__header">
      <h4>{{title}}</h4>
      <div class="notes-item__triangle-notes">
        <img src="/src/assets/img/icon/triangle-notise.svg" alt="main-photo" />
      </div>
    </div>
    <div class="notes-item__text">
      <p>{{text}}</p>
      <div class="notes-item__remove" @click="() => emits('remove-item', id)">
        <icon-close />
        <span>Удалить</span>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.notes-item {
  border-radius: 12px;
  overflow: hidden;
  width: 100%;
  box-shadow: 0px 15px 15px -10px rgba(0, 0, 0, 0.4);

  @media(min-width: $desktop) {
    width: calc(100% / 3 - 14px);
  }
  @media(min-width: $desktop) {
    width: calc(100% / 3 - 27px);
  }

  &__header {
    padding: 20px 28px;
    width: calc(100% - 40px);
    background: $green-light-color;
    border-bottom: 1px solid $green-color;
    position: relative;
    box-sizing: border-box;

    h4 {
      color: $white-color;
      @include h4-mob
    }

    &:before {
      content: '';
      width: 40px;
      height: calc(100% - 39px);
      background: $green-light-color;
      position: absolute;
      bottom: -1px;
      right: -40px;
      border-bottom: 1px solid $green-color;
      box-sizing: border-box;
    }

    .notes-item__triangle-notes {
      width: 40px;
      height: 40px;
      position: absolute;
      top: 0;
      right: -40px;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    @media(min-width: $tablet) {
      @include h4;
    }
  }

  &__text {
    background: $green-light-color;
    padding: 20px 28px;

    p {
      @include text-normal-mob;
      color: $white-color;
    }

    @media(min-width: $tablet) {
      p {
        @include text-normal;
      }
    }
  }

  &__remove {
    margin: 50px 0 0 auto;
    max-width: max-content;
    display: flex;
    align-items: center;
    cursor: pointer;

    span {
      @include text-normal;
      color: $white-color;
      margin: 0 0 0 12px;
    }

    svg {
      width: 16px;
      height: 16px;
    }
  }
}
</style>
