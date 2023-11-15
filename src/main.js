import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import '@fortawesome/fontawesome-free/css/all.css'
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue'
import VueDOMPurifyHTML from 'vue-dompurify-html'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

createApp(App).use(router).use(createPinia().use(piniaPluginPersistedstate)).use(BootstrapIconsPlugin).use(VueDOMPurifyHTML).mount('#app')
