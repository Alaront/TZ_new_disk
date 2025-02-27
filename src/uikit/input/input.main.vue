<script setup lang="ts">
  interface Props {
    label?: string,
    placeholder: string,
    textError?: string,
    isPassword?: boolean,
  }

  const text = defineModel<string>({ required: true })

  const props = defineProps<Props>()

</script>

<template>
  <label class="input-main">
    <span v-if="label">{{label}}</span>
    <input type="text" v-model="text" :placeholder="placeholder"/>
    <p v-if="textError" class="input-main__error">{{textError}}</p>
  </label>
</template>

<style scoped lang="scss">
.input-main {
  display: flex;
  flex-direction: column;
  position: relative;

  span {
    padding: 0 0 0 24px;
    margin-bottom: 8px;
    @include text-small;
    color: $gray-color;
  }

  input {
    padding: 22px 28px;
    background: $white-color;
    border-radius: 36px;
    border: 2px solid $white-color;
    box-sizing: border-box;

    &:hover {
      border-color: $green-light-color;
    }

    &:focus {
      border-color: $green-light-color;
    }
  }

  &__error {
    @include text-small;
    color: #FF7461;
    margin-top: 8px;
    padding: 0 0 0 24px;
  }
}
</style>
