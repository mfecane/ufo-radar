<script setup lang="ts">
import OpenMap from '@/components/OpenMap.vue'
import Container from '@/components/Container.vue'
import Layout from '@/components/Layout.vue'
import Header from '@/components/Header.vue'
import { useStore } from '@/model/use-store'
import { onMounted } from 'vue'
import { readPoints, checkAuth } from '@/model/firebase'
import Router from '@/components/Router.vue'
import AddPointButton from '@/components/AddPointButton.vue'
import { Views } from '@/model/types'
import { computed } from '@vue/reactivity'
import OverlayForm from '@/components/common/form/OverlayForm.vue'
import { useAuth } from '@/model/hooks/useAuth'

const store = useStore()

const { checkCurrentUser } = useAuth()

onMounted(async () => {
  await checkCurrentUser()
})
</script>

<template>
  <OverlayForm />
  <Layout>
    <template #header>
      <Header />
    </template>
    <template #body>
      <router-view />
    </template>
  </Layout>
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
