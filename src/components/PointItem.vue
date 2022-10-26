<script setup lang="ts">
import { Point } from '@/model/point'
import { computed } from '@vue/reactivity'
import { truncateText } from '@/lib/lib'
import { useRouter } from 'vue-router'

const MAX_LENGTH = 128

interface Props {
  point: Point
}

const router = useRouter()
const props = defineProps<Props>()
const lat = computed(() => props.point.coords[0].toFixed(2) || 0)
const lng = computed(() => props.point.coords[1].toFixed(2) || 0)
const descrition = computed(() => {
  return truncateText(props.point.description, MAX_LENGTH)
})
const id = computed(() => {
  return props.point.id
})

function handleClick() {
  router.push(`/map/${id.value}`)
}
</script>

<template>
  <a href="#" @click.prevent="handleClick()">
    <div class="coords">
      <span class="label">latitude</span>
      <span class="coord">
        {{ lat }}
      </span>
      <span class="label">longitude</span>
      <span class="coord">
        {{ lng }}
      </span>
    </div>
    <p class="description">{{ descrition }}</p></a
  >
</template>

<style lang="scss" scoped>
.coords {
  display: flex;
  gap: 4px 8px;
  display: grid;
  grid-template-columns: max-content max-content;
}

.label {
  color: #999;
  font-size: 0.8rem;
}

.coord {
  font-weight: bold;
  color: #ccc;
  font-size: 0.8rem;
}

.description {
  margin-top: 8px;
  color: #999;
}
</style>
