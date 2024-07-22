import Vue from 'vue'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import database from './database'
import { initializeData } from './actions'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [VuexORM.install(database),  createPersistedState({
    key: 'my-vuex-store',
    storage: window.localStorage
  })],
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
