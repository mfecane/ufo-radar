<script lang="ts" setup>
function handleSubmit() {}
</script>

<template>
  <section class="col">
    <slot name="label"></slot>
    <slot name="control"></slot>
  </section>
</template>

<style lang="scss" scoped>
.col {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  margin: 16px 0px;
}
</style>
