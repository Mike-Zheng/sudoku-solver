import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import piniaStore from './store'
import './index.css'
// 額外引入圖標庫

// 支持SVG
import 'virtual:svg-icons-register'
createApp(App).use(router).use(piniaStore).mount('#app')
