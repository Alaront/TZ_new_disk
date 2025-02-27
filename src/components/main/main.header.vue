<script setup lang="ts">
  import { IconLogo } from "../../assets/img/logo";
  import { IconLogin , IconUser } from "../../uikit/icon";
  import { ButtonMain } from "../../uikit/button";
  import { PopupMain } from "../popup";
  import { FormRegister, FormLogin } from "../form";
  import {computed, onMounted, ref} from "vue";
  import {useRouter} from "vue-router";
  import {userAuth, userAuthOut} from "../../api/api.user.ts";

  const forms = {
    register: FormRegister,
    login: FormLogin,
  }

  const isLogin = ref<boolean>(false)
  const userName = ref<string>('')
  const isShowBtnOut = ref<boolean>(false)

  const isLogInPopup =ref<boolean>(false)
  const isRegisterPopup =ref<boolean>(false)

  const router = useRouter();

  const closePopUp = () => {
    isLogInPopup.value = false
    isRegisterPopup.value = false
  }

  const goLogin = () => {
    isRegisterPopup.value = false;
    isLogInPopup.value = true;
  }

  const goRegister = () => {
    isLogInPopup.value = false;
    isRegisterPopup.value = true;
  }

  const getUserData = async () => {
    try {
      const data = await userAuth();

      userName.value = data.email;

      isLogin.value = true
      isLogInPopup.value = false
      isRegisterPopup.value = false

    } catch (e) {
      router.push('/')
      window.localStorage.removeItem('token-disk')
      console.error(e)
    }
  }

  const goPersonal = async () => {
    if(window.localStorage.getItem('token-disk')) {

      await getUserData()

      router.push('/personal')
    }

    router.push('/')
  }

  const userOut = async () => {
    try {
      const data = await userAuthOut();

      if(data.status === 200) {
        router.push('/')
        isLogin.value = false
        window.localStorage.removeItem('token-disk')
      }
    } catch (e) {
      console.log(e)
    }
  }

  const computedForm = computed(() => {
    return forms[isRegisterPopup.value ? 'register' : 'login']
  })

  onMounted(() => {
    // все эти доступы и данные об пользователе лучше делегировать через данные в сторе, но я не знаю можно ли его использовать
    if(window.localStorage.getItem('token-disk')) {
      getUserData()
    } else {
      router.push('/')
    }
  })
</script>

<template>
  <header class="header">
    <div class="header__wrapper">
      <div class="header__logo" @click="router.push('/')">
        <icon-logo />
      </div>

      <div v-if="!isLogin" class="header__btn" @click="isLogInPopup = true">
        <button-main text="Вход" aria-label="Вход" >
          <template #icon>
            <icon-login/>
          </template>
        </button-main>
      </div>

      <div @click="router.push('/personal')" v-else @mouseenter="isShowBtnOut = true" @mouseleave="isShowBtnOut = false" class="header__user">
        <p>{{ userName }}</p>
        <span><icon-user /></span>

        <div v-if="isShowBtnOut" class="header__user-out" @click.stop>
          <div @click="userOut" class="header__user-out-content">
            Выйти
          </div>
        </div>
      </div>
    </div>
  </header>

  <popup-main v-if="isLogInPopup || isRegisterPopup" @close="closePopUp">
    <component
        :is="computedForm"
        @go-login="goLogin"
        @go-register="goRegister"
        @goPersonal="goPersonal"
    />
  </popup-main>
</template>

<style scoped lang="scss">
.header {
  width: 100%;
  padding: 20px;
  position: relative;
  z-index: 1;

  &__wrapper {
    max-width: 1600px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__logo {
    width: 154px;
    height: 36px;
    flex-shrink: 0;
    cursor: pointer;

    @media(min-width: $tablet) {
      width: 218px;
      height: 50px;
    }
  }

  &__user {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-shrink: 1;
    min-width: 0;
    margin-left: 20px;
    cursor: pointer;
    position: relative;


    p {
      @include text-small-mob;
      color: $white-color;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex-shrink: 1;
      min-width: 0;
    }

    span {
      width: 36px;
      height: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      overflow: hidden;
      background: $middle-color;
      flex-shrink: 0;

      svg {
        width: 13px;
        height: 16px;
      }
    }

    @media(min-width: $tablet) {
      p {
        @include text-small;
      }

      span {
        width: 56px;
        height: 56px;

        svg {
          width: 20px;
          height: 28px;
        }
      }
    }

    &-out {
      position: absolute;
      top: 100%;
      right: 0;
      padding-top: 20px;
    }

    &-out-content {
      @include text-small-bold;
      color: $green-light-color;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 145px;
      height: 108px;
      box-shadow: 0px 15px 46px -10px rgba(0, 0, 0, 0.6);
      border-radius: 12px;
      background: $middle-color;
      position: relative;

      &:before {
        content: '';
        width: 18px;
        height: 9px;
        background: url("src/assets/img/icon/triangle-menu.svg") no-repeat center;
        background-size: contain;
        position: absolute;
        top: -9px;
        right: 20px;
      }
    }
  }
}
</style>
