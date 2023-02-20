<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import openMap from '@/model/map'
import { useStore } from '@/model/use-store'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

onMounted(() => {
  openMap.createMap('map')
  openMap.setClickHandler(store.setActivePoint)
})

onUnmounted(() => {
  openMap.destroyMap()
  openMap.clearClickHandler()
})

watch(
  () => ({ route, coords: store.editor.data?.coords }),
  ({ route, coords }) => {
    if (route.path.indexOf('edit') !== -1) {
      if (coords) {
        store.setMapPoints([coords])
      } else {
        store.setMapPoints([])
      }
    } else {
      store.setMapPoints(store.points.map((p) => p.coords))
    }
  }
)

watch(store.map.points, (points) => {
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
