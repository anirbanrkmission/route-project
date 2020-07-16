import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import VueRouter from "vue-router";
import routes from './routes'
import store from './store'
import axios from 'axios'

Vue.use(VueRouter)
const router = new VueRouter({
  routes
})

router.beforeEach(
  (to, from, next) => {
    console.log('In before Each from: ', from.params)
    console.log('In beforeEach to: ', to.params)
    console.log('In beforeEach Store loggedIn: ', store.state.loggedIn)
    if (store.state.loggedIn) {
      //store.commit('change', true)
      //store.commit('setId', to.params.id)
      if (to.params.id == '') {
        to.params.id = store.state.id
      }
      next()
    } else {
      if (!to.params.id) {
        next()
      }
      if (to.params.id == '') {
        next('home')
      }
      axios.get('http://localhost:8000/checkLoginStatus/' + to.params.id).then(
        (response) => {
          console.log('Response data at beforeEach: ', response.data)
          if (!response.data) {
            next(false)
          } else {
            store.commit('change', true)
            store.commit('setId', to.params.id)
            console.log('Go to Profile Id: ', store.state.id)
            next()
          }
        })
    }
  }
)

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')