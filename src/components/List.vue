<script setup lang="ts">
import { useStore } from '@/model/use-store'
import PointItem from '@/components/PointItem.vue'
import { onMounted } from 'vue'
import { readPoints } from '@/model/firebase'
import { Point } from '@/model/point'

const store = useStore()

const readPointsList = async () => {
  const points = (await readPoints()) as Point[]
  store.init(points)
}

onMounted(readPointsList)
</script>

<template>
  <ul class="list">
    <li v-for="point in store.points"><PointItem :point="point" /></li>
  </ul>
</template>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
