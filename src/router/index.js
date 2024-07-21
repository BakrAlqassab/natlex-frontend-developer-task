import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/components/LoginPage.vue'
import RegisterPage from '@/components/RegisterPage.vue'
import HomeView from '@/components/HomeView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'LoginPage', component: HomeView },
    { path: '/login', name: 'LoginPage', component: LoginPage },
    { path: '/register', name: 'RegisterPage', component: RegisterPage },
  ]
})
