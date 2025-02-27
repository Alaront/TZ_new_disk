<script setup lang="ts">
  interface Props {
    label?: string,
    placeholder: string,
    maxSize?: number
  }

  const text = defineModel<string>({ required: true })

  const props = defineProps<Props>()

  const handleInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (props.maxSize && input.value.length > props.maxSize) {
      input.value = input.value.slice(0, props.maxSize);
      text.value = input.value;
    }
  };

</script>

<template>
  <label class="input-main">
    <span v-if="label">{{label}}</span>

    <textarea v-model="text" :placeholder="placeholder" @input="handleInput" />

    <p v-if="maxSize" class="input-main__max-size">{{text.length}} / {{maxSize}}</p>

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

  textarea {
    padding: 22px 28px;
    background: $white-color;
    border-radius: 36px;
    border: 2px solid $white-color;
    box-sizing: border-box;
    outline: none;
    min-height: 168px;
    resize: none;

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
}
</style>
