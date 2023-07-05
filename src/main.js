import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import messagePlugin from './utils/message.plugin'
import 'materialize-css'
import 'materialize-css/dist/js/materialize.min'

const app = createApp(App).use(store).use(router).mount('#app')
