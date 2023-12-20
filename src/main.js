import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/styles/index.scss'

import '@/assets/styles/realize/element-variable.scss'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.mount('#app')
