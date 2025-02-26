<script setup lang="ts">
</script>

<template>
  <div class="layout">
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
}
</style>
