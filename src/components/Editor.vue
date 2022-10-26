<script setup lang="ts">
import { ButtonType, Views } from '@/model/types'
import { useStore } from '@/model/use-store'
import { ref, onMounted, reactive, watch } from 'vue'
import Button from '@/components/common/Button.vue'
import { computed } from '@vue/reactivity'
import FileArea from '@/components/common/FileArea.vue'
import { createPoint, savePoint, uploadFile } from '@/model/firebase'
import { useRouter } from 'vue-router'

const ACCURACY = 2

const store = useStore()
const router = useRouter()

const description = ref(store.editor.data?.description || '')
const errors = ref<string[] | null>(null)
const saveable = ref(true)
const success = ref<boolean>(false)

function cancelEditing() {
  store.currentView = Views.list
  store.activePoint = null
  router.push('/map/list')
}

function showSuccess() {
  success.value = true
  setTimeout(() => {
    success.value = false
  }, 2000)
}

async function submitEditing() {
  try {
    await savePoint(store.editor.data!)
    showSuccess()
  } catch (e) {
    errors.value = [(e as Error).toString()]
  }
}

const handleFiles = async (files: FileList) => {
  const arr = Array.from(files)
  arr.forEach(async (f) => {
    const url = await uploadFile(f, store.editor.data!.id)
    store.addFile(url!)
  })
}

const point = computed(() => ({
  lat: (store.activePoint?.lat || 0).toFixed(ACCURACY) || '-',
  lng: (store.activePoint?.lng || 0).toFixed(ACCURACY) || '-',
}))

onMounted(async () => {
  if (!store.editor.data && store.currentUser) {
    const point = await createPoint(store.currentUser)
    store.updateEditor(point)
  } else {
    throw new Error('Invalid data')
  }
})

watch(
  () => store.activePoint,
  (point) => {
    store.editor.data!.coords = [point!.lat, point!.lng]
  }
)

function onChange() {
  store.editor.data!.description = description.value
}

watch(
  () => store.editor.data,
  (data) => {
    description.value = data!.description
    saveable.value = data!.isSaveable()
    if (!saveable.value) {
      errors.value = data!.getErrors()
    } else {
      errors.value = null
    }
  },
  { deep: true }
)
</script>

<template>
  <h2 class="header">Edit spot</h2>
  <form class="form" @submit.prevent="submitEditing">
    <section class="coords">
      <label class="label">Latitude</label>
      <div class="coordElement">{{ point.lat }}</div>
      <label class="label">Longitude</label>
      <div class="coordElement">{{ point.lng }}</div>
    </section>
    <section class="formGroup description">
      <label class="label">Description</label>
      <textarea
        type="text"
        v-model="description"
        @input="onChange"
        class="field textarea description__textarea"
      ></textarea>
    </section>
    <section class="formGroup">
      <label class="label">Evidence (.jpeg, .png)</label>
      <FileArea @on-files="handleFiles">
        <div
          class="thumbnail__container"
          v-for="(f, idx) in store.editor?.data?.files"
          :key="idx"
        >
          <img :src="f" class="thumbnail" />
        </div>
      </FileArea>
    </section>
    <div v-show="success" class="success">Saved</div>
    <div v-show="errors && errors.length" v-for="error in errors" class="error">
      {{ error }}
    </div>
    <section class="buttons">
      <Button
        @click="submitEditing"
        :type="ButtonType.save"
        :disabled="!saveable"
      >
        Save
      </Button>
      <Button @click="cancelEditing" :type="ButtonType.cancel">Cancel</Button>
    </section>
  </form>
</template>

<style lang="scss" scoped>
@import '@/css/config.scss';

.header {
  color: rgb(23, 30, 25);
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.warning {
  border-radius: 5px;
  background-color: $warning;
  color: $warningDark;
  padding: 5px 10px;
}

.error {
  border-radius: 5px;
  background-color: $error;
  color: $errorDark;
  padding: 5px 10px;
}

.success {
  border-radius: 5px;
  background-color: $success;
  color: $successDark;
  padding: 5px 10px;
}

.form {
  width: 100%;
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  gap: 1.625rem;
}

.coords {
  display: grid;
  grid-template-columns: 8rem 8rem;
  gap: 1rem;
}

.coordElement {
  justify-self: right;
}

.description {
  flex: 1 0 auto;
  max-height: 30rem;
  min-height: 10rem;
}

.formGroup {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.description__textarea {
  flex: 1 0 auto;
  padding: 0.625rem;
  font-size: 1rem;
  line-height: 1.625rem;
  width: 100%;
  resize: vertical;
}

.label {
  color: #999;
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

.thumbnail__container {
  max-width: 100px;
  max-height: 100px;
  overflow: hidden;
  display: inline-block;
}

.thumbnail {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
</style>
