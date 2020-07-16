import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loggedIn: false,
    id: ''
  },
  mutations: {
    change(state, login) {
      state.loggedIn = login
    },
    setId(state, u_id) {
      state.id = u_id
    }
  },
  actions: {},
  modules: {},
  getters: {
    loggedIn: state => state.loggedIn,
    id: state => state.id
  }
})

export default store