<script setup lang="ts">
  import { ButtonMain } from "../../uikit/button";
  import { IconAdd } from "../../uikit/icon";
  import { NotesItem } from "../../components/notes";
  import { PopupMain } from "../../components/popup";
  import { FormNotes } from "../../components/form";
  import {onMounted, ref} from "vue";
  import {dellNotes, getNotesUser} from "../../api/api.notes.ts";
  import type { FetchNotesResponse } from "../../types/fetch.ts";

  const isPopNotes = ref<boolean>(false);

  const notesList = ref<FetchNotesResponse[]>([])

  const getNotes = async () => {
    isPopNotes.value = false

    try {
      notesList.value = await getNotesUser();
    } catch (error) {
      console.log(error)
    }
  }

  const removeItem = async (id: number) => {
    console.log('dd')
    await dellNotes(id)
    getNotes()
  }

  onMounted(() => {
    getNotes()
  })

</script>

<template>
  <div class="personal">
    <div class="personal__wrapper">
      <notes-item v-for="item in notesList" :key="item.id" :text="item.content" :title="item.title" :id="item.id" @removeItem="removeItem"/>
    </div>
    <div class="personal__add">
      <button-main :round="true" @click="isPopNotes = true">
        <template #icon>
          <icon-add />
        </template>
      </button-main>
    </div>
  </div>
  <popup-main v-if="isPopNotes" @close="isPopNotes = false">
    <form-notes @closeSend="getNotes" />
  </popup-main>
</template>

<style scoped lang="scss">
.personal {
  flex: 1;
  position: relative;

  &__add {
    position: fixed;
    right: 40px;
    bottom: 40px;
    box-shadow: 0px 15px 46px -10px rgba(0, 0, 0, 0.6);
    border-radius: 50%;
  }

  &__wrapper {
    width: calc(100% - 20px);
    max-width: 1600px;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media(min-width: $tablet) {
      width: calc(100% - 40px);
      margin: 40px auto;
    }

    @media(min-width: $desktop) {
      width: calc(100% - 40px);
      flex-direction: row;
      flex-wrap: wrap;
      gap: 20px;
    }

    @media(min-width: $desktop_full) {
      width: calc(100% - 40px);
      flex-direction: row;
      flex-wrap: wrap;
      gap: 40px;
    }
  }
}
</style>
