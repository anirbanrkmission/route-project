<template>
  <v-container>
    <navigation :navigation_items="navigation_items"></navigation>
    <v-row dense no-gutters>
      <v-col>
        <v-card>
          <v-card-title>{{user.name}} </v-card-title>
          <v-card-subtitle>{{user.username}}</v-card-subtitle>
          <v-card-text>
            <v-tabs v-model="tab" centered>
              <v-tabs-slider></v-tabs-slider>
              <v-tab v-for="tab in tabs" :key="tab.name" :href="tab.href">
                <v-icon>{{tab.icon}}</v-icon> {{tab.name}}
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
              <v-tab-item v-for="tabItem in tabsItem" :key="tabItem.value" :value="tabItem.value">
                <component :is="tabItem.comp" :userData="user"/>
              </v-tab-item>
            </v-tabs-items>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import navigation from "./Navigation";
import Feed from "./Feed";
import Friends from "./Friends";
import Edit from "./Edit";
import Story from './Story';

import axios from 'axios'
import store from '../store'

export default {
  name: 'profile',
  components: {
    navigation,
    Feed,
    Friends,
    Edit
  },
  data() {
    return {
      tab: null,
      tabs: [
        {
          name: 'Your Posts',
          href: '#feed',
          icon: 'mdi-newspaper'
        },
        {
          name: 'Friends',
          href: '#friends',
          icon: 'mdi-account-multiple'
        },
        {
          name: 'Edit Profile',
          href: '#edit',
          icon: 'mdi-pencil'
        },
        {
          name: 'Story',
          href: '#story',
          icon: 'mdi-panda'
        }
      ],
      tabsItem: [
        {
          value: 'feed',
          comp: Feed
        },
        {
          value: 'friends',
          comp: Friends
        },
        {
          value: 'edit',
          comp: Edit
        },
        {
          value: 'story',
          comp: Story
        }
      ],
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
      user: null
    }
  },
  methods: {
  },
  mounted() {
    // console.log('In  profile store id: ',store.state.id)
    axios.get('http://localhost:8000/getUser/'+store.state.id).then(
      (response) => {
        this.user = response.data[0]
        // console.log('In Profile user: ',this.user)
      })
  }
}
</script>