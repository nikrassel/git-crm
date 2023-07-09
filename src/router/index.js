import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Categories from '@/views/Categories.vue'
import DetailRecord from '@/views/DetailRecord.vue'
import OperationHistory from '@/views/History'
import Home from '@/views/Home'
import Planning from '@/views/Planning'
import Profile from '@/views/Profile'
import Record from '@/views/Record'


const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'empty'},
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    meta: {layout: 'empty'},
    component: Register
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {layout: 'main'},
    component: Categories
  },
  {
    path: '/detail',
    name: 'detail',
    meta: {layout: 'main'},
    component: DetailRecord
  },
  {
    path: '/history',
    name: 'history',
    meta: {layout: 'main'},
    component: OperationHistory
  },
  {
    path: '/',
    name: 'homepage',
    meta: {layout: 'main'},
    component: Home
  },
  {
    path: '/planning',
    name: 'planning',
    meta: {layout: 'main'},
    component: Planning
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {layout: 'main'},
    component: Profile
  },
  {
    path: '/record',
    name: 'record',
    meta: {layout: 'main'},
    component: Record
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
