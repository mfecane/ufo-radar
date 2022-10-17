<script setup lang="ts">
import { Point } from '@/model/types'

interface Props {
  point: Point
}

const props = defineProps<Props>()
</script>

<template>
  <p>{{ props.point.descr }}</p>
</template>

<style lang="scss" scoped></style>
