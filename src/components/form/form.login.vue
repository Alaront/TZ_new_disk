<script setup lang="ts">
  import {InputMain} from "../../uikit/input";
  import {ButtonMain} from "../../uikit/button";
  import {ref} from "vue";

  interface Emit {
    (e: 'goRegister'): void
  }

  const emit = defineEmits<Emit>()

  const email = ref<string>('')
  const password = ref<string>('')
</script>

<template>
  <div class="from-login">
    <h2>Вход в ваш аккаунт</h2>
    <form>
      <input-main v-model="email" label="Email" placeholder="Введите Email"/>
      <input-main :is-password="true" v-model="password" label="Пароль" placeholder="Введите пароль"/>
      <div class="from-login__btn">
        <button-main text="Войти"/>
        <p>
          У вас нет аккаунта?
          <span @click="emit('goRegister')">Зарегистрируйтесь</span>
        </p>
      </div>
    </form>
    <div class="from-login__error">
      Пользователь с таким логином не найден
    </div>
  </div>
</template>

<style scoped lang="scss">
.from-login {
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

    p {
      margin: 12px 0 0 0;
      @include text-small-mob;
      color: $gray-color;
      text-align: center;

      span {
        @include text-small-bold;
        color: $green-light-color;
        cursor: pointer;
      }
    }

    @media(min-width: $tablet) {
      margin-bottom: 40px;
      flex-direction: row-reverse;
      justify-content: space-between;

      p {
        @include text-small-mob;
      }
    }
  }

  &__error {
    padding: 8px 20px;
    @include text-small;
    color: #FF7461;
    width: 100%;
    border-radius: 24px;
    background: rgba(255, 116, 97, 0.1);

  }
}
</style>
