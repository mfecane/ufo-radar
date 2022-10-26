<script lang="ts" setup>
import { ButtonType } from '@/model/types'

const props = withDefaults(
  defineProps<{ type: ButtonType; disabled?: boolean }>(),
  {
    disabled: false,
  }
)
</script>

<template>
  <button
    class="btn"
    :class="{
      save: props.type === ButtonType.save,
      cancel: props.type === ButtonType.cancel,
    }"
    :disabled="props.disabled"
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
