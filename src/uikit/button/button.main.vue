<script setup lang="ts">
  interface Props {
    text?: string
    disabled?: boolean
  }

  interface Emits {
    (e: 'click'): void
  }

  defineProps<Props>()
  const emit = defineEmits<Emits>()

</script>

<template>
  <button class="button" :class="{'button--disabled': disabled}" @click="emit('click')" :disabled="disabled">
    <span class="button__icon" v-if="$slots['icon']">
      <slot name="icon" />
    </span>
    <span v-if="text" class="button__text">{{text}}</span>
  </button>
</template>

<style scoped lang="scss">
.button {
  padding: 12px 24px;
  background: $green-light-color;
  display: flex;
  gap: 12px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 32px;
  cursor: pointer;

  &__text {
    @include text-normal;
    color: $white-color;
  }

  &__icon {
    width: 32px;
    height: 32px;
  }

  &:hover {
    background: $green-middle-color;
  }

  &:active {
    background: $green-dark-color;
  }

  &--disabled {
    background: $gray-color;
    cursor: auto;

    &:hover {
      background: $gray-color;
    }

    &:active {
      background: $gray-color;
    }
  }
}
</style>
