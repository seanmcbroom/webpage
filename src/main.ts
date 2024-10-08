import './assets/main.css'

import { createApp } from 'vue'
import { vuePlugin as i18n } from './plugins/i18n'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(i18n)
app.mount('#app')
