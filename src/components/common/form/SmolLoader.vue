<script lang="ts" setup></script>

<template>
  <div class="loader"></div>
</template>

<style lang="scss" scoped>
@import '@/css/config.scss';

.loader {
  border: 4px solid black; /* Light grey */
  border-top: 4px solid $accent; /* Blue */
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 3s linear infinite;
  margin-right: 8px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
