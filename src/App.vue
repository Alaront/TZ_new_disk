<script setup lang="ts">
import {MainHeader} from "./components/main";
</script>

<template>
  <div class="layout">
    <main-header/>
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  font-family: $font-family, Arial, sans-serif;
  font-size: 14px;
  line-height: 20px;
}

body {
  min-height: 100vh;
  background: $dark-color;

  &.limited {
    overflow: hidden;
  }
}

.layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
