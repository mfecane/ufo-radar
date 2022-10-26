<script lang="ts" setup>
import { EFormTypes } from '@/model/types'
import { useStore } from '@/model/use-store'
import Form from '@/components/common/form/Form.vue'
import InputGroup from '@/components/common/form/InputGroup.vue'
import { ref } from 'vue'
import { checkAuth, login } from '@/model/firebase'
import { useAuth } from '@/model/hooks/useAuth'

const store = useStore()
const email = ref('')
const password = ref('')
const error = ref<string | null>(null)
const loading = ref(false)
const { checkCurrentUser } = useAuth()

async function handleSubmit() {
  try {
    loading.value = true
    await login(email.value, password.value)
    await checkCurrentUser()
    loading.value = false
    store.setFormScreen(EFormTypes.none)
  } catch (e) {
    error.value = (e as Error).toString()
    loading.value = false
  }
}

function handleForgot() {
  store.setFormScreen(EFormTypes.forgot)
}

function handleSignup() {
  store.setFormScreen(EFormTypes.signup)
}
</script>

<template>
  <Form
    @submit="handleSubmit"
    title="Sign In"
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
    <template #footer>
      <section class="form-links">
        <a @click.prevent="handleForgot()" class="form-link">Forgot password</a>
        <a @click.prevent="handleSignup()" class="form-link">Sign Up</a>
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

.form-link {
}
</style>
