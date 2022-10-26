<script setup lang="ts">
import { useStore } from '@/model/use-store'
import { computed } from '@vue/reactivity'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

function click() {
  router.push('/map/edit')
}

const disabled = computed(() => {
  return !store.currentUser
})
</script>

<template>
  <button class="btn add" @click="click" :disabled="disabled">+</button>
</template>

<style scoped lang="scss">
@import '@/css/config.scss';

.btn.add {
  position: absolute;
  bottom: 32px;
  left: 32px;
  z-index: 5;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: $accentDim;
  color: $accent;
  font-weight: bold;
  font-size: 2rem;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.6);
}

.btn.add:hover:not(:disabled) {
  color: white;
  background-color: $dark;
  cursor: pointer;
}
</style>
