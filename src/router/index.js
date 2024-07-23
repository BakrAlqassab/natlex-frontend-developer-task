import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/components/LoginPage.vue'
import RegisterPage from '@/components/RegisterPage.vue'
import HomeView from '@/components/HomeView.vue'
import DashboardPage from '@/components/DashboardPage.vue'
import AdminPage from '@/components/AdminPage.vue'
import store from '@/store'

Vue.use(Router)

const router =new Router({
  mode: 'history',
  routes: [
 
    { path: '/login', name: 'LoginPage', component: LoginPage ,  meta: { notRequiresAuth: true }},
    { path: '/register', name: 'RegisterPage', component: RegisterPage ,  meta: { notRequiresAuth: true } },
    { path: '/', name: 'HomeView', component: HomeView },
    { path: '/dashboard', name: 'DashboardPage', component: DashboardPage ,  meta: { requiresAuth: true }},
    { path: '/admin', name: 'AdminPage', component: AdminPage ,  meta: { requiresAuth: true }},
  ]
})



router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!store.getters.isAuthenticated) { 
        next({ name: 'LoginPage' })
      } else {
        next()
      }
    }  if (to.matched.some(record => record.meta.notRequiresAuth)) {
      if (store.getters.isAuthenticated) { 
        next({ name: 'HomeView' })
      } else {
        next()
      }
    } else {
      next()
    }
  })

  export default  router;
