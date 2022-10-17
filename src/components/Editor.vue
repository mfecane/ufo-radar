<script setup lang="ts">
import { ButtonType, Views } from '@/model/types'
import { useStore } from '@/model/use-store'
import { reactive } from 'vue'
import Button from '@/components/common/Button.vue'
import { computed } from '@vue/reactivity'

const ACCURACY = 1000

const store = useStore()

const state = reactive<{
  description: string
}>({ description: '' })

function cancelEditing() {
  store.currentView = Views.list
  store.activePoint = null
}

function submitEditing() {}

function onChange() {
  store.updateEditor({
    description: state.description,
  })
}

const point = computed(() => ({
  lat: Math.floor((store.activePoint?.lat || 0) * ACCURACY) / ACCURACY || '-',
  lng: Math.floor((store.activePoint?.lng || 0) * ACCURACY) / ACCURACY || '-',
}))
</script>

<template>
  <form class="form" @submit.prevent="submitEditing">
    <div v-show="!store.activePoint" class="warning">Pick a point</div>
    <section class="coords">
      <label>Latitude</label>
      <div class="coordElement">{{ point.lat }}</div>
      <label>Longitude</label>
      <div class="coordElement">{{ point.lng }}</div>
    </section>
    <section class="formGroup">
      <label>Description</label>
      <textarea
        type="text"
        v-model="state.description"
        @input="onChange"
        class="field"
        rows="12"
      ></textarea>
    </section>
    <section class="formGroup">
      <label>Evidence</label>
      <div class="file"></div>
    </section>
    <section class="buttons">
      <Button @click="submitEditing" :type="ButtonType.save">Save</Button>
      <Button @click="cancelEditing" :type="ButtonType.cancel">Cancel</Button>
    </section>
  </form>
</template>

<style lang="scss" scoped>
.warning {
  border-radius: 5px;
  color: rgb(142, 0, 0);
  border: 1px solid rgb(198, 0, 0);
  background-color: rgba(255, 0, 0, 0.375);
  padding: 5px 10px;
}

.form {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
}

.coords {
  display: grid;
  grid-template-columns: 8rem 8rem;
  gap: 1rem;
}

.coordElement {
  justify-self: right;
}

.formGroup {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field {
  border: 1px solid rgb(206, 213, 207);
  outline: none;
  border-radius: 5px;

  &:focus:not(:disabled) {
    border: none;
    border-bottom: 1px solid rgb(8, 22, 10);
    background-color: rgb(241, 241, 241);
  }
}

.buttons {
  flex: 0 0 auto;
  display: flex;
  justify-content: space-between;
  gap: 16px;

  .btn {
    flex: 1 0 50%;
  }
}

.file {
  width: 128px;
  height: 128px;
  background-color: rgb(233, 238, 232);
  border-radius: 5px;
}
</style>
