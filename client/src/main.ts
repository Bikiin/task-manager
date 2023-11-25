import '@/assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast, { POSITION, TYPE } from "vue-toastification"
import "vue-toastification/dist/index.css"

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(Toast, {position: POSITION.BOTTOM_RIGHT, type: TYPE.ERROR});
app.use(router)

app.mount('#app')
