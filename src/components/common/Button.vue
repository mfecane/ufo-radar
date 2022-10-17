<script lang="ts" setup>
import { ButtonType } from '@/model/types'

defineProps<{ type: ButtonType }>()
</script>

<template>
  <button
    class="btn"
    :class="{
      save: type === ButtonType.save,
      cancel: type === ButtonType.cancel,
    }"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.btn {
  padding: 10px 20px;
  font-size: 20px;
  border-radius: 4px;
  background-color: rgb(46, 49, 45);
  color: white;
}

.btn:hover:not(:disabled) {
  background-color: rgb(91, 94, 90);
}

.save {
  background-color: rgb(42, 119, 69);

  &:hover:not(:disabled) {
    background-color: rgb(55, 181, 55);
  }
}

.cancel {
  background-color: rgb(126, 35, 29);

  &:hover:not(:disabled) {
    background-color: rgb(180, 60, 51);
  }
}
</style>
