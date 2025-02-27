<script setup lang="ts">
  import {InputMain} from "../../uikit/input";
  import {ButtonMain} from "../../uikit/button";
  import {ref} from "vue";
  import {userLogin} from "../../api/api.user.ts";
  import {AxiosError} from "axios";

  interface Emit {
    (e: 'goRegister'): void
    (e: 'goPersonal'): void
  }

  const emit = defineEmits<Emit>()

  const email = ref<string>('')
  const password = ref<string>('')

  const btnDisabled = ref<boolean>(false)
  const emailError = ref<string>("");
  const passwordError = ref<string>("");
  const responseError = ref<string>('');

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

    console.log(isValid)
    return isValid;
  }

  const formSubmit = async (e: Event) => {
    e.preventDefault()
    btnDisabled.value = true;
    responseError.value = '';

    console.log('submit')

    if(!validation()) {
      btnDisabled.value = false;
      return
    }

    // testTest123@mail.com
    // 132DFsdf#

    const responseData = {
      password: password.value,
      email: email.value
    }

    try {
      const data = await userLogin(responseData)

      if(data.accessToken) {
        // токен лучше хранить в сторе и слушать его на появление токена, но я не понял можно ли использовать стейтменеджеры
        window.localStorage.setItem('token-disk', data.accessToken)

        emit('goPersonal')
      }

    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        responseError.value = error.response.data.message;
      }
    }

    btnDisabled.value = false;
  }
</script>

<template>
  <div class="from-login">
    <h2>Вход в ваш аккаунт</h2>
    <form @submit="formSubmit">
      <input-main v-model="email" label="Email" placeholder="Введите Email" :text-error="emailError"/>
      <input-main :is-password="true" v-model="password" label="Пароль" placeholder="Введите пароль" :password-error="passwordError"/>
      <div class="from-login__btn">
        <button-main title="Отправить" text="Войти" aria-label="Войти"/>
        <p>
          У вас нет аккаунта?
          <span @click="emit('goRegister')">Зарегистрируйтесь</span>
        </p>
      </div>
    </form>
    <div v-if="responseError" class="from-login__error">
      {{responseError}}
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
