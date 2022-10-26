<script lang="ts" setup></script>

<template>
  <section class="input-group">
    <label class="label"><slot name="label" /></label><slot />
  </section>
</template>

<style lang="scss" scoped>
@import '@/css/config.scss';

.input-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  margin: 16px 0px;
}

.label {
  font-size: 1.1rem;
  color: $accentDim;
}
</style>
