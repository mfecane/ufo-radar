<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from 'vue'
import openMap from '@/model/map'
import { useStore } from '@/model/use-store'
import { useRoute } from 'vue-router'
import { Point } from '@/model/point'

const store = useStore()
const route = useRoute()

onMounted(() => {
  openMap.createMap('map')
})

onUnmounted(() => {
  openMap.destroyMap()
})

const points = computed<Point[]>(() => {
  if (route.path.indexOf('edit') !== -1) {
    if (store.editor.data) {
      return [store.editor.data]
    }
    return []
  }
  return store.points
})

watch(points, (points) => {
  openMap.clearPoints()
  openMap.drawPoints(points)
})
</script>

<template>
  <div id="map"></div>
</template>

<style lang="scss" scoped>
#map {
  z-index: 1;
  width: 100%;
  height: 100%;
}
</style>
