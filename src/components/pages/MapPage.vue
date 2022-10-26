<script setup lang="ts">
import OpenMap from '@/components/OpenMap.vue'
import AddPointButton from '@/components/AddPointButton.vue'
import Container from '@/components/Container.vue'
import { useRoute } from 'vue-router'
import { computed } from '@vue/reactivity'

const route = useRoute()
const showAddButton = computed(() => route.path.indexOf('edit') === -1)
</script>

<template>
  <OpenMap />
  <Container><router-view /></Container>
  <Transition> <AddPointButton v-show="showAddButton" /></Transition>
</template>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: transform, opacity 0.2s ease-out;
}

.v-enter-from,
.v-leave-to {
  transform: scale(0.7);
  opacity: 0;
}
</style>
