<script setup lang="ts">
import { useStore } from '@/model/use-store'
import { computed } from '@vue/reactivity'
import { EFormTypes } from '@/model/types'

import Login from '@/components/auth/Login.vue'
import Signup from '@/components/auth/Signup.vue'
import UserCreated from '@/components/auth/UserCreated.vue'

const store = useStore()

const formComponent = computed(() => {
  switch (store.formScreen) {
    case EFormTypes.login:
      return Login
    case EFormTypes.signup:
      return Signup
    case EFormTypes.created:
      return UserCreated
    default:
      return null
  }
})

function handleOverLayClick() {
  store.setFormScreen()
}
</script>

<template>
  <template v-if="formComponent">
    <div class="overlay" @click="handleOverLayClick"></div>
    <div class="container">
      <component :is="formComponent" />
    </div>
  </template>
</template>

<style lang="scss" scoped>
@import '@/css/config.scss';

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 5;
  background-color: #111111cc;
}

.container {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 50vw;
  min-height: 50vh;
  transform: translate(-50%, -50%);
  z-index: 6;
  background-color: $light;
  border-radius: 5px;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.3);
}
</style>
