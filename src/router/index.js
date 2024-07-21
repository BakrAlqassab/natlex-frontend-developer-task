import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/components/LoginPage.vue'
import RegisterPage from '@/components/RegisterPage.vue'
import HomeView from '@/components/HomeView.vue'
import store from '@/store'

Vue.use(Router)

const router =new Router({
  mode: 'history',
  routes: [
 
    { path: '/login', name: 'LoginPage', component: LoginPage },
    { path: '/register', name: 'RegisterPage', component: RegisterPage },
    { path: '/', name: 'HomeView', component: HomeView ,  meta: { requiresAuth: true }},
  ]
})



router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!store.getters.isAuthenticated) { 
        next({ name: 'LoginPage' })
      } else {
        next()
      }
    } else {
      next()
    }
  })

  export default  router;
