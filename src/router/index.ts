import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import Home from '@/pages/index.vue'

const routes = [{ path: '/', component: Home }]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export default router
