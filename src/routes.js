import Home from './components/Home.vue'
import User from "./components/User.vue"
import Profile from "./components/Profile";

import store from "./store";
import axios from 'axios'

const routes = [{
    path: '*',
    name: 'home',
    component: Home,
    beforeEnter: (to, from, next) => {
      // console.log('At Home from.params: ', from.params)
      // console.log('At Home to.params: ', to.params)
      store.commit('change', false)
      store.commit('setId', '')
      // console.log('Id, loggedIn: ', store.state.id, store.state.loggedIn)
      next()
    }
  },
  {
    path: '/user/:id',
    name: 'user',
    component: User,
    beforeEnter: (to, from, next) => {
      // console.log('Username at routes: ', to.params.id)
      axios.get('http://localhost:8000/checkLoginStatus/' + to.params.id).then(
        (response) => {
          // console.log('Response data: ', response.data)
          if (!response.data) {
            next(false)
          } else {
            // console.log('In beforeEnter to: ', to.params)
            store.commit('change', true)
            store.commit('setId', to.params.id)
            next()
          }
        })
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile/:id',
    name: 'profile',
    component: Profile
  }
];
export default routes