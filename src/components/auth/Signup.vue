<script lang="ts" setup>
import { ref } from 'vue'
import { EFormTypes } from '@/model/types'
import { useStore } from '@/model/use-store'
import Form from '@/components/common/form/Form.vue'
import InputGroup from '@/components/common/form/InputGroup.vue'
import { signup } from '@/model/firebase'

const store = useStore()
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const error = ref<string | null>(null)
const loading = ref(false)

async function handleSubmit() {
  if (password.value !== passwordConfirm.value) {
    error.value = 'Passwords do not match'
    return
  }

  try {
    loading.value = true
    await signup(email.value, password.value)
    loading.value = false
    store.setFormScreen(EFormTypes.created)
  } catch (e) {
    error.value = (e as Error).toString()
    loading.value = false
  }
}

function handleForgot() {
  store.setFormScreen(EFormTypes.forgot)
}

function handleSignIn() {
  store.setFormScreen(EFormTypes.login)
}
</script>

<template>
  <Form
    @submit="handleSubmit"
    title="Sign Up"
    :error="error"
    :loading="loading"
  >
    <template #title>Log In</template>
    <InputGroup>
      <template #label>E-mail</template>
      <input type="email" class="form-input" v-model="email" />
    </InputGroup>
    <InputGroup>
      <template #label>Password</template>
      <input type="password" class="form-input" v-model="password" />
    </InputGroup>
    <InputGroup>
      <template #label>Confirm password</template>
      <input type="password" class="form-input" v-model="passwordConfirm" />
    </InputGroup>
    <template #footer>
      <section class="form-links">
        <a @click.prevent="handleForgot()" class="form-link">Forgot password</a>
        <a @click.prevent="handleSignIn()" class="form-link">Sign in</a>
      </section>
    </template>
  </Form>
</template>

<style lang="scss" scoped>
.form-links {
  margin-top: 20px;
  display: flex;
  gap: 16px;
}
</style>
