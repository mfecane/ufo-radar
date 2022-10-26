import { computed, onMounted, ref } from 'vue'
import { readPoints } from '@/model/firebase'
import { Point } from '@/model/point'
import { useStore } from '@/model/use-store'

export const usePoints = () => {
  const store = useStore()
  const loading = ref(false)
  const error = ref<string | null>(null)

  onMounted(async () => {
    if (!store.points.length) {
      try {
        loading.value = true
        const points = (await readPoints()) as Point[]
        store.init(points)
        loading.value = false
      } catch (e) {
        error.value = (e as Error).toString()
      }
    }
  })

  return { points: computed(() => store.points), loading, error }
}
