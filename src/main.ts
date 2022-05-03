import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import piniaStore from './store'
import 'normalize.css'
import '@/assets/styles/base.scss'
import './index.css'

import DKToast from 'vue-dk-toast'
// 支持SVG
import 'virtual:svg-icons-register'
createApp(App)
  .use(DKToast, {
    duration: 1500,
    pauseOnHover: true,
    positionY: 'top', // 'top' or 'bottom'
    positionX: 'center', // 'left', 'right' or 'center'
    disableClick: false,
    class: 'app-toast', // Added to each toast,
    max: 3,
  })
  .use(router)
  .use(piniaStore)
  .mount('#app')
