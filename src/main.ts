import { createApp } from 'vue'
import App from '@/components/App.vue'
import { createPinia } from 'pinia'

import '@/css/null.scss'
import '@/css/styles.scss'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.mount('#app')
