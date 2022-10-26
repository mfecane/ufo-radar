<script lang="ts" setup>
import SmolLoader from '@/components/common/form/SmolLoader.vue'

const props = withDefaults(
  defineProps<{ title: string; error: string | null; loading: boolean }>(),
  {
    error: null,
    loading: false,
  }
)
const emit = defineEmits(['submit'])

function handleSubmit() {
  emit('submit')
}
</script>

<template>
  <section class="header">{{ props.title }}</section>
  <form @submit.prevent="handleSubmit" class="form">
    <section class="error" v-if="props.error">{{ props.error }}</section>
    <slot />
    <button type="submit" class="btn form-submit" :disabled="loading">
      <SmolLoader v-show="loading" /> {{ props.title }}
    </button>
    <slot name="footer" />
  </form>
</template>

<style lang="scss" scoped>
@import '@/css/config.scss';

.header {
  font-size: 2rem;
  color: $accent;
  font-weight: bold;
  background-color: $dark;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  padding: 20px 40px;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
  padding: 16px 40px 40px 40px;
}

.form-submit {
  margin-top: 16px;
}

.error {
  color: red;
  font-weight: bold;
}
</style>
