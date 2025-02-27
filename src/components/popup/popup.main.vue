<script setup lang="ts">
import {onMounted, onUnmounted} from "vue";
import { ButtonMain } from "../../uikit/button";
import {IconClose} from "../../uikit/icon";

interface Emit {
  (e: 'close'): void
}

const emit = defineEmits<Emit>()

onMounted(() => {
  document.body.classList.add('limited')
})

onUnmounted(() => {
  document.body.classList.remove('limited')
})
</script>

<template>
  <div class="popup-main" @click="emit('close')">
    <div class="popup-main__wrapper" @click.stop>
      <slot />

      <div class="popup-main__close" @click="emit('close')">
        <button-main :round="true">
          <template #icon>
            <icon-close />
          </template>
        </button-main>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.popup-main {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(10, 31, 56, 0.66);
  display: flex;
  align-items: center;
  justify-content: center;

  &__wrapper {
    width: calc(100% - 8px);
    height: auto;
    border-radius: 40px;
    background: $middle-color;
    max-width: 688px;
    max-height: max-content;
    padding: 42px 16px;
    position: relative;

    @media(min-width: $tablet) {
      max-width: 780px;
      width: calc(100% - 40px);
      padding: 56px;
    }
  }

  &__close {
    position: absolute;
    top: 12px;
    right: 12px;
  }
}
</style>
