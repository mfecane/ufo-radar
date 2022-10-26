import { createApp } from 'vue'
import App from '@/components/App.vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHashHistory } from 'vue-router'

import '@/css/null.scss'
import '@/css/styles.scss'
import MapPageVue from '@/components/pages/MapPage.vue'
import UserList from '@/components/pages/UserList.vue'
import MapEditor from '@/components/pages/MapEditor.vue'
import EditorVue from '@/components/Editor.vue'
import ListVue from '@/components/List.vue'
import PointDetails from '@/components/list/PointDetails.vue'

const pinia = createPinia()
const app = createApp(App)

const routes = [
  // dynamic segments start with a colon
  { path: '/', redirect: '/map/list' },
  { path: '/mylist/', component: UserList },
  {
    path: '/map/',
    component: MapPageVue,
    children: [
      { path: '', component: ListVue },
      { path: 'list', component: ListVue },
      { path: 'edit', component: EditorVue },
      { path: ':id', component: PointDetails },
    ],
  },
]

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

app.use(pinia)
app.use(router)
app.mount('#app')
