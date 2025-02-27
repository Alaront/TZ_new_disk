<script setup lang="ts">
import {InputMain, TextareaMain} from "../../uikit/input";
import {ButtonMain} from "../../uikit/button";
import {ref} from "vue";

interface Emit {
  (e: 'goRegister'): void
}

const emit = defineEmits<Emit>()

const title = ref<string>('')
const text = ref<string>('')
</script>

<template>
  <div class="from-notes">
    <h2>Добавление заметки</h2>
    <form>
      <input-main :max-size="100" v-model="title" label="Название заметки" placeholder="Введите название"/>
      <textarea-main :max-size="500" v-model="text" label="Текст заметки" placeholder="Введите текст"/>
      <div class="from-notes__btn">
        <button-main text="Добавить"/>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.from-notes {
  overflow: auto;
  height: 100%;

  h2 {
    @include h2-mob;
    color: $white-color;
    margin-bottom: 28px;

    @media(min-width: $tablet) {
      @include h2;
      margin-bottom: 40px;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__btn {
    display: flex;
    flex-direction: column;
    margin-bottom: 26px;

    @media(min-width: $tablet) {
      margin-bottom: 40px;
      flex-direction: row-reverse;
      justify-content: space-between;
    }
  }
}
</style>
