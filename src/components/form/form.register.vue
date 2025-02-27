<script setup lang="ts">
  import {InputMain} from "../../uikit/input";
  import {ButtonMain} from "../../uikit/button";
  import { userRegister, userLogin } from "../../api/api.user.ts";
  import {ref} from "vue";

  interface Emit {
    (e: 'goLogin'): void
    (e: 'goPersonal'): void
  }

  const emit = defineEmits<Emit>()

  const email = ref<string>('')
  const password = ref<string>('')
  const repeatPassword = ref<string>('')

  const emailError = ref<string>("");
  const passwordError = ref<string>("");
  const repeatPasswordError = ref<string>("");
  const responseError = ref<string>('')

  const btnDisabled = ref<boolean>(false);

  const validation = (): boolean => {

    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      emailError.value = "Некорректный email";
      isValid = false;
    } else {
      emailError.value = "";
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password.value) || password.value.length < 8) {
      passwordError.value =
          "Пароль должен содержать минимум 8 символов, одну заглавную букву, одну цифру и один специальный символ";
      isValid = false;
    } else {
      passwordError.value = "";
    }

    if (password.value !== repeatPassword.value) {
      repeatPasswordError.value = "Пароли не совпадают";
      isValid = false;
    } else {
      repeatPasswordError.value = "";
    }

    return isValid;
  }

  const formSubmit = async (e: Event) => {
    e.preventDefault()
    btnDisabled.value = true;
    responseError.value = '';

    if(!validation()) {
      btnDisabled.value = false;
      return
    }

    const responseData = {
      password: password.value,
      confirm_password: repeatPassword.value,
      email: email.value
    }

    try {
      await userRegister(responseData)
      const data = await userLogin(responseData)

      if(data.accessToken) {
        // токен лучше хранить в сторе и слушать его на появление токена, но я не понял можно ли использовать стейтменеджеры
        window.localStorage.setItem('token-disk', data.accessToken)

        emit('goPersonal')
      }

    } catch (error) {
      responseError.value = error.response.data.message;
    }

    btnDisabled.value = false;
  }
</script>

<template>
  <div class="from-register">
    <h2>Регистрация</h2>
    <form @submit="formSubmit">
      <input-main v-model="email" label="Email" placeholder="Введите Email" :text-error="emailError"/>
      <input-main :is-password="true" v-model="password" label="Пароль" placeholder="Введите пароль" :text-error="passwordError"/>
      <input-main :is-password="true" v-model="repeatPassword" label="Пароль ещё раз" placeholder="Введите пароль" :text-error="repeatPasswordError"/>

      <div class="from-register__btn">
        <button-main title="Отправить" aria-label="Зарегистрироваться" text="Зарегистрироваться" :disabled="btnDisabled"/>
        <p>
          У вас есть аккаунт?
          <span @click="emit('goLogin')">Войдите</span>
        </p>
      </div>
    </form>
    <div v-if="responseError" class="from-register__error"> {{responseError}} </div>
  </div>
</template>

<style scoped lang="scss">
.from-register {
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
