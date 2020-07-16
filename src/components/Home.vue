<template>
  <v-container>
    <navigation :navigation_items="navigation_items"></navigation>
    
    <v-subheader><h2 class="pa-3">Spookbook</h2></v-subheader>
    <v-row dense no-gutters>
      <v-col class="ma-4 pa-4">
        <v-card elevation="5" max-width="300" max-height="700" class="pa-10">
          <v-card-title>Login</v-card-title>
          <v-text-field label="User Id" v-model="id"></v-text-field>

          <v-text-field label="Password" v-model="pwd"></v-text-field>

          <router-link :to="{name: 'user', params: {id: id, password: pwd}}">
            <v-btn color="primary" @click="loggedIn()">Login</v-btn>
          </router-link>
        </v-card>
      </v-col>
      <v-col class="ma-4 pa-4">
        <v-card elevation="5" max-width="300" max-height="700" class="pa-10">
          <v-card-title>Signup</v-card-title>
          <signup/>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import navigation from "./Navigation";
import signup from "./Signup";

export default {
  name: "Home",
  components: {
    navigation, signup
  },
  data() {
    return {
      id: "",
      pwd: "",
      // drawer: true,
      navigation_items: [
        {title: 'Home', icon: 'mdi-home', 
          route: {
            name: 'home',
            params: {
              logout: true
            }
          }
        }
      ],
    };
  },
  methods: {
    loggedIn() {
      console.log("Id at store: ", this.$store.state.id);
    },
  }
};
</script>
