<script setup lang="ts">
import SiteLogo from '@/components/SiteLogo.vue'
import Nav from '@/components/Nav.vue'
</script>

<template>
  <div class="container">
    <SiteLogo />
    <Nav />
  </div>
</template>

<style lang="scss" scoped>
@import '@/css/config.scss';

.container {
  width: 100%;
  height: 100px;
  background-color: $dark;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 60px;
  font-size: 32px;
}
</style>
