<script setup lang="ts"></script>

<template>
  <div class="container">
    <div class="header"><slot name="header" /></div>
    <div class="body"><slot name="body" /></div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.header {
}

.body {
  position: relative;
  flex: 1 0 auto;
}
</style>
