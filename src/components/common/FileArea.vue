<script lang="ts" setup>
import { ref, watchEffect } from 'vue'

const emit = defineEmits(['onFiles'])
const hightlight = ref(false)
const area = ref<HTMLDivElement | null>(null)

const handleFiles = (files: FileList) => {
  emit('onFiles', files)
}

watchEffect(() => {
  if (area.value) {
    area.value.addEventListener('dragenter', (e) => {
      hightlight.value = true
      e.preventDefault()
      e.stopPropagation()
    })
    area.value.addEventListener('dragover', (e) => {
      hightlight.value = true
      e.preventDefault()
      e.stopPropagation()
    })
    area.value.addEventListener('dragleave', (e) => {
      hightlight.value = false
      e.preventDefault()
      e.stopPropagation()
    })
    area.value.addEventListener('drop', (e) => {
      hightlight.value = false
      e.preventDefault()
      e.stopPropagation()
      let dt = e.dataTransfer
      let files = dt!.files
      handleFiles(files)
    })
  }
})
</script>

<template>
  <div class="container" :class="{ hightlight: hightlight }" ref="area">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: max-content;
  min-height: 120px;
  background-color: rgb(237, 239, 237);
  border-radius: 5px;
  padding: 10px;
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  align-items: center;
}

.hightlight {
  background-color: rgb(176, 176, 165);
  border: 2px solid rgb(123, 123, 113);
}
</style>
