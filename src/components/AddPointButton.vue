<script setup lang="ts">
import { Views } from '@/model/types'
import { useStore } from '@/model/use-store'

const store = useStore()
function click() {
  store.setCurrentView(Views.editor)
}
</script>

<template>
  <button class="add" @click="click">+</button>
</template>

<style scoped lang="scss">
.add {
  position: absolute;
  bottom: 32px;
  left: 32px;
  z-index: 5;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 1px solid #999;
  background-color: white;
  font-weight: bold;
  font-size: 2rem;
  color: #999;
}
</style>
