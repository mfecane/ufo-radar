<script setup lang="ts">
import List from '@/components/List.vue'
import Editor from '@/components/Editor.vue'
import { useStore } from '@/model/use-store'
import { computed } from '@vue/reactivity'
import { Views } from '@/model/types'

const store = useStore()

const currentView = computed(() => {
  if (store.currentView === Views.list) {
    return List
  } else {
    return Editor
  }
})
</script>

<template>
  <component :is="currentView" />
</template>
