import { computed } from 'vue'
import { checkAuth } from '@/model/firebase'
import { useStore } from '@/model/use-store'

export const useAuth = function () {
  const store = useStore()

  const checkCurrentUser = async function () {
    const user = await checkAuth()
    store.setCurrentUser(user)
  }

  return {
    user: computed(() => {
      store.currentUser
    }),
    checkCurrentUser,
  }
}
