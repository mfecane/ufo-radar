<script setup lang="ts">
import { useStore } from '@/model/use-store'
import Point from '@/components/Point.vue'

const store = useStore()
</script>

<template>
  <ul class="">
    <li v-for="point in store.points"><Point :point="point" /></li>
  </ul>
</template>

<style lang="scss" scoped></style>
