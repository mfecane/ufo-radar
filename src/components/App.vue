<script setup lang="ts">
import OpenMap from '@/components/OpenMap.vue'
import Container from '@/components/Container.vue'
import Layout from '@/components/Layout.vue'
import Header from '@/components/Header.vue'
import { useStore } from '@/model/use-store'
import { onMounted } from 'vue'
import { readPoints } from '@/model/firebase'
import Router from '@/components/Router.vue'
import AddPointButton from './AddPointButton.vue'
import { Views } from '@/model/types'
import { computed } from '@vue/reactivity'

const store = useStore()
onMounted(async () => {
  const points = await readPoints()
  store.init(points!)
})

const showAddButton = computed(() => store.currentView === Views.list)
</script>

<template>
  <Layout>
    <template #header>
      <Header />
    </template>
    <template #body>
      <OpenMap />
      <Container><Router /></Container>
      <AddPointButton v-show="showAddButton" />
    </template>
  </Layout>
</template>
