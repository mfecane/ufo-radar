<script setup lang="ts">
import { useStore } from '@/model/use-store'
import { useRouter } from 'vue-router'

const router = useRouter()
function handleClick() {
  router.push('/')
}
</script>

<template>
  <a @click.prevent="handleClick()">
    <div class="logo">UFO<span class="green">RADAR</span></div>
  </a>
</template>

<style lang="scss" scoped>
@import '@/css/config.scss';

.green {
  color: $accent;
}

.logo {
  color: white;
}
</style>
