<script setup lang="ts">
  interface Props {
    text?: string
    disabled?: boolean
    round?: boolean
    ariaLabel?: string
    title?: string
  }

  interface Emits {
    (e: 'click'): void
  }

  defineProps<Props>()
  const emit = defineEmits<Emits>()

</script>

<template>
  <button :title="title" :aria-label="ariaLabel" class="button" :class="{'button--disabled': disabled, 'button--round': round}" @click="emit('click')" :disabled="disabled">
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

    &::v-deep svg {
      width: 100%;
      height: 100%;
    }
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

  &--round {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    padding: 0;

    .button__icon {
      width: 16px;
      height: 16px;
    }
  }
}
</style>
