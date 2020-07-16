<template>
  <v-container>
    <v-navigation-drawer
      v-model="drawer"
      color="primary"
      expand-on-hover
      clipped
      dark
      fixed
    >
      <v-list
        dense
        nav
        class="py-0"
      >

        <v-list-item two-line class="px-1">
          <v-list-item-content>
            <v-list-item-title>User</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
      
        <v-list-item
          v-for="item in navigation_items"
          :key="item.title"
          :to="{name: item.route.name, params: {id: id , password: pwd, logout: item.route.params.logout}}"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>
  </v-container>
</template>

<script>
import store from '../store'

export default {
  name: 'navigation',
  props: ['navigation_items'],
  data() {
    return {
      id: store.state.id,
      pwd: '',
      drawer: true,
      logoutInfo: false
    }
  }
}
</script>