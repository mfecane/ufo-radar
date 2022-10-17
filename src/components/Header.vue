<script setup lang="ts">
import SiteLogo from '@/components/SiteLogo.vue'
import SiteMenu from '@/components/SiteMenu.vue'
</script>

<template>
  <div class="container">
    <SiteLogo />
    <SiteMenu />
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100px;
  background-color: #171717;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 60px;
  font-size: 32px;
}
</style>
