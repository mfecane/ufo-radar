<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import { OpenMap } from '@/model/map'
import { useStore } from '@/model/use-store'
import { Views } from '@/model/types'
import { map } from 'leaflet'

const store = useStore()

onMounted(() => {
  OpenMap.getInstance().createMap('map')
})

onUnmounted(() => {
  OpenMap.getInstance().destroyMap()
})

watch(
  () => store.points,
  function (points) {
    OpenMap.getInstance().addMarkers(points)
  }
)

watch(
  () => store.activePoint,
  (point) => {
    if (store.showActivePoint && point) {
      const p = { coords: [point.lat, point.lng] as [number, number], id: '' }
      OpenMap.getInstance().setCurrentPoint(p)
    } else {
      OpenMap.getInstance().removeCurrentPoint()
    }
  }
)

watch(
  () => store.currentView,
  (view) => {
    if (view === Views.editor) {
      OpenMap.getInstance().setClickHandler(store.click)
    } else {
      OpenMap.getInstance().clearClickHandler()
    }
  }
)
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
