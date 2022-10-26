<script setup lang="ts">
import { Views } from '@/model/types'
import { useStore } from '@/model/use-store'
import { computed } from '@vue/reactivity'

const store = useStore()
const wide = computed(() => store.currentView === Views.editor)
</script>

<template>
  <div class="container" :class="{ wide: wide }"><slot /></div>
</template>

<style lang="scss" scoped>
.container {
  top: 20px;
  bottom: 20px;
  position: absolute;
  right: 20px;
  width: 400px;
  background-color: white;
  z-index: 2;
  border-radius: 8px;
  transition: width 200ms ease-in-out;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.wide {
  width: 800px;
  min-width: 400px;
  max-width: 50vw;
}
</style>
