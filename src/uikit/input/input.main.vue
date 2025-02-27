<script setup lang="ts">
import {onMounted, ref} from "vue";
import {IconPassword, IconOnPassword} from "../icon";

interface Props {
    label?: string,
    placeholder: string,
    textError?: string,
    isPassword?: boolean,
    maxSize?: number
  }

  const text = defineModel<string>({ required: true })

  const passwordComponents = ref<boolean>(false)

  const props = defineProps<Props>()

  const handleInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (props.maxSize && input.value.length > props.maxSize) {
      input.value = input.value.slice(0, props.maxSize);
      text.value = input.value;
    }
  };

  onMounted(() => {
    if(props.isPassword) {
      passwordComponents.value = true;
    }
  })

</script>

<template>
  <label class="input-main">
    <span v-if="label">{{label}}</span>

    <input :type="passwordComponents ? 'password' : 'text'" v-model.trim="text" :placeholder="placeholder" @input="handleInput"/>

    <div class="input-main__password" v-if="isPassword" @click="passwordComponents = !passwordComponents">
      <icon-password v-if="passwordComponents" />
      <icon-on-password v-else />
    </div>

    <p v-if="maxSize" class="input-main__max-size">{{text.length}} / {{maxSize}}</p>

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

  &__max-size {
    color: $gray-color;
    width: 100%;
    text-align: right;
    margin-top: 8px;
    padding: 0 24px 0 0;
  }

  &__password {
    position: absolute;
    top: 62px;
    right: 30px;
  }

  &__error {
    @include text-small;
    color: #FF7461;
    margin-top: 8px;
    padding: 0 0 0 24px;
  }
}
</style>
