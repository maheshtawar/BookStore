import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { i18n } from '@/setup/i18n.js'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'

const app = createApp(App)

app.use(PrimeVue)
app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
