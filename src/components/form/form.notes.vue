<script setup lang="ts">
import {InputMain, TextareaMain} from "../../uikit/input";
import {ButtonMain} from "../../uikit/button";
import {ref} from "vue";
import {sendNotesUser} from "../../api/api.notes.ts";
import type {FetchNotes} from "../../types/fetch.ts";

interface Emit {
  (e: 'close-send'): void
}

const emit = defineEmits<Emit>()

const title = ref<string>('')
const text = ref<string>('')

const pushNotes = async (e: Event) => {
  e.preventDefault()

  const responseData: FetchNotes = {
    title: title.value,
    content: text.value
  }

  const data = await sendNotesUser(responseData);
  emit('close-send')
  console.log(data)
}

</script>

<template>
  <div class="from-notes">
    <h2>Добавление заметки</h2>
    <form @submit="pushNotes">
      <input-main :max-size="100" v-model="title" label="Название заметки" placeholder="Введите название"/>
      <textarea-main :max-size="500" v-model="text" label="Текст заметки" placeholder="Введите текст"/>
      <div class="from-notes__btn">
        <button-main title="Отправить" text="Добавить" aria-label="Добавить"/>
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
