<script setup lang="ts">
import { Point } from '@/model/point'
import { usePoints } from '@/model/use-points'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SmolLoader from '../common/form/SmolLoader.vue'

const route = useRoute()
const { points, loading, error } = usePoints()

const currentPoint = computed(() => {
  return points.value.find((point: Point) => {
    return point.id === route.params.id
  })
})

const lat = computed(() => currentPoint.value?.coords[0].toFixed(2))
const lng = computed(() => currentPoint.value?.coords[1].toFixed(2))
</script>

<template>
  <SmolLoader v-if="loading" />
  <div v-if="currentPoint">
    {{ lat }}
    {{ lng }}
    <p>
      {{ currentPoint.description }}
    </p>
    <div class="evidence-container">
      <img v-for="f in currentPoint.files" :src="f" class="evidence" />
    </div>
  </div>
  <div v-else>point not found</div>
</template>

<style lang="scss" scoped>
.evidence-container {
  display: flex;
  flex-direction: column;
}

.evidence {
  width: 100%;
  object-fit: cover;
}
</style>
