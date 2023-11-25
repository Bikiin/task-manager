import { checkIsAuthenticated } from '@/utils/session'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { 
      path: '/:pathMatch(.*)*', 
      name: 'home', 
      component: () => import('../views/HomeView.vue') 
    },
    { 
      path: '/', 
      name: 'home', 
      component: () => import('../views/HomeView.vue') 
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})
router.beforeEach(async (to, from) => {
  if ( !checkIsAuthenticated() && to.name !== 'login' && to.name !== 'register' ) return { name: 'login' }
})

export default router