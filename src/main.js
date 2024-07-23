import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  beforeCreate() {
    this.$store.dispatch('initializeData')
  },
  render: h => h(App)
}).$mount('#app')

window.addEventListener('storage', (event) => {
  if (event.key === 'redirectTo' && event.newValue) {
    router.push(event.newValue);
  }
});
