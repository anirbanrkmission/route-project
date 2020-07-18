<template>
  <v-container>
    <navigation :navigation_items="navigation_items"></navigation>
      <h1>User Page</h1>
      <p> Welcome {{$route.params.id}} </p>
      <v-btn
          color='primary'
          @click="loggedOut()"
          :to="{name: 'home', params: {}}"
        >Logout</v-btn>
  </v-container>
</template>

<script>
import navigation from "./Navigation";

import store from "../store";

export default {
  name: 'User',
  components: {
    navigation
  },
  data () {
    return {
      id: '',
      pwd: '',
      navigation_items: [
        {
          title: 'Home', icon: 'mdi-home', 
          route: {
            name: 'user',
            params: {
              id: store.state.id,
              logout: false
            }
          }
        },
        {
          title: 'Profile',
          icon: 'mdi-account',
          route: {
            name: 'profile',
            params: {
              id: store.state.id,
              logout: false
            }
          }
        },
        {
          title: 'Logout',
          icon: 'mdi-logout',
          route: {
            name: 'home',
            params: {
              logout: true
            }
          }
        }
      ],
    }
  },
  methods: {
    loggedOut() {
      // console.log('In User Id: ', store.state.loggedIn)
      store.commit('change', false)
      store.commit('setId', '')
      // console.log('After Commit: ', store.state.loggedIn)
    }
  },
  mounted() {
    // console.log('Store:', store.state.id)
  }
}
</script>
