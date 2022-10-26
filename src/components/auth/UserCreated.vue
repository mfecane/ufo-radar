<script lang="ts" setup>
import { EFormTypes } from '@/model/types'
import { useStore } from '@/model/use-store'

const store = useStore()

function handleClick() {
  store.setFormScreen(EFormTypes.none)
}
</script>

<template>
  <div class="container">
    <p class="message">User created</p>
    <button class="btn" @click="handleClick()">OK</button>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.message {
  font-size: 2rem;
}
</style>
