import Vue from 'vue'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import database from './database'
import { initializeData } from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
<<<<<<< Updated upstream
  plugins: [VuexORM.install(database)],
=======
  plugins: [VuexORM.install(database),  
    createPersistedState({
      key: 'my-vuex-store',
      storage: window.localStorage,
      reducer: state => ({
        authenticatedUser: state.authenticatedUser,
        entities: state.entities
      })
    })

],
>>>>>>> Stashed changes
  state: {
    authenticatedUser: null
  },
  mutations: {
    setAuthenticatedUser(state, user) {
      state.authenticatedUser = user
    },
    logout(state) {
      state.authenticatedUser = null
    }
  },
  actions: {
    initializeData
  },
  getters: {
    isAuthenticated: state => !!state.authenticatedUser,
    authenticatedUser: state => state.authenticatedUser
  }
})
