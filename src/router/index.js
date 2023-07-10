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
import { auth, fBase } from "@/main"
import { getAuth, onAuthStateChanged } from "firebase/auth"

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
    meta: {layout: 'main', auth: true},
    component: Categories
  },
  {
    path: '/detail/:id',
    name: 'detail',
    meta: {layout: 'main', auth: true},
    component: DetailRecord
  },
  {
    path: '/history',
    name: 'history',
    meta: {layout: 'main', auth: true},
    component: OperationHistory
  },
  {
    path: '/',
    name: 'homepage',
    meta: {layout: 'main', auth: true},
    component: Home
  },
  {
    path: '/planning',
    name: 'planning',
    meta: {layout: 'main', auth: true},
    component: Planning
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {layout: 'main', auth: true},
    component: Profile
  },
  {
    path: '/record',
    name: 'record',
    meta: {layout: 'main', auth: true},
    component: Record
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some(record => record.meta.auth)
  setTimeout(() => {
    if (requireAuth && !auth.currentUser) {
      next('/login?message=login')
    } else {
      next()
    }
  }, 500)
})

export default router
