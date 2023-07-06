import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Loader from '@/components/app/Loader'
import 'materialize-css'
import 'materialize-css/dist/js/materialize.min'
import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database"
import 'firebase/database'

const firebaseConfig = {
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: "vue-crm-fdb.firebaseapp.com",
    projectId: "vue-crm-fdb",
    storageBucket: "vue-crm-fdb.appspot.com",
    messagingSenderId: "475046000335",
    appId: "1:475046000335:web:d013c8100251a21861a9ba",
    measurementId: "G-LVN4XH6F6H",
    databaseURL: 'https://vue-crm-fdb-default-rtdb.europe-west1.firebasedatabase.app'
  };

const fBase = initializeApp(firebaseConfig)
export const auth = getAuth(fBase);
export const database = getDatabase(fBase)
if (fBase && auth) {
    const app = createApp(App).use(store).use(router).component('Loader', Loader).mount('#app')
}
