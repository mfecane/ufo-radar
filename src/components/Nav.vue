<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { EFormTypes } from '@/model/types'
import { useStore } from '@/model/use-store'
import { logOut } from '@/model/firebase'
import { useAuth } from '@/model/hooks/useAuth'

const store = useStore()
const { checkCurrentUser } = useAuth()
const router = useRouter()

function handleLogin() {
  store.setFormScreen(EFormTypes.login)
}

async function handleLogout() {
  await logOut()
  await checkCurrentUser()
  router.push('/map/list')
}

const loggedIn = computed(() => {
  return !!store.currentUser
})

function handleExplore() {
  router.push('/map/list/')
}
</script>

<template>
  <nav class="sitemenu__container">
    <ul>
      <li class="nav__item"><a @click.prevent="handleExplore()">Explore</a></li>
      <li class="nav__item">
        <a class="btn btn_smol" @click.prevent="handleLogout" v-if="loggedIn">
          Log out
        </a>
        <a class="btn btn_smol" @click.prevent="handleLogin" v-else>Log in</a>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
@import '@/css/config.scss';

.sitemenu__container ul {
  display: flex;
  gap: 32px;
  align-items: center;
  justify-content: center;
}

.nav__item {
  list-style: none;
  display: inherit;
}

.nav__item a {
  color: $accent;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
}

.nav__item a:hover {
  color: white;
}
</style>
