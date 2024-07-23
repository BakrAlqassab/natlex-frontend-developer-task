import Vue from 'vue'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import database from './database'
import { initializeData } from './actions'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

const store = new Vuex.Store({
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
  state: {
    authenticatedUser: null
  },
  mutations: {
    setAuthenticatedUser(state, user) {
      state.authenticatedUser = user
    },
    logout(state) {
      state.authenticatedUser = null
    },
    updateStateFromStorage(state) {
  
      const storageState = JSON.parse(localStorage.getItem('my-vuex-store'));
      if (storageState) {
        this.replaceState(Object.assign(state, storageState));
      }
    },
  },
  actions: {
    initializeData
  },

  getters: {
    isAuthenticated: state => !!state.authenticatedUser,
    authenticatedUser: state => state.authenticatedUser
  }
})

window.addEventListener('storage', () => {
  store.commit('updateStateFromStorage');
});

export default store;