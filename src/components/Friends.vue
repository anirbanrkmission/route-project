<template>
  <v-container>
    <h2>{{userData.name}}'s friends</h2><br/>
    <v-card
      class="d-inline-block mx-auto"
      elevation="5"
      v-for="obj in userData.friends"
      :key="obj.friend.username"
    >
      <v-card-title>{{obj.friend.name}}</v-card-title>
      <v-card-subtitle>{{obj.friend.username}} </v-card-subtitle>
    </v-card>
    <br/><br/>
    <h2>People you may know</h2><br/>
    <v-card
      class="d-inline-block mx-auto"
      elevation="5"
      v-for="person in filteredPeople"
      :key="person._id"
    >
      <v-card-title>
        <v-avatar>
          <v-icon >mdi-account</v-icon>
        </v-avatar>{{person.name}}
      </v-card-title>

      <v-card-subtitle>{{person.username}}</v-card-subtitle>

      <v-card-actions>
          <v-btn color="primary" @click="addToFriendList(person)">Add Friend</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'
import store from "../store";

export default {
  name: 'Friends',
  props: ['userData'],
  data() {
    return {
      people: [],
    }
  },
  computed: {
    filteredPeople() {
      return this.people.filter( personObj => {
        return (personObj.username != store.state.id) && this.existanceInFriendList(personObj.username)
      })
    },
  },
  methods: {
    getPeopleYouMayKnow() {
      axios.get('http://localhost:8000/getAllPeople').then(
        (response) => {
          this.people = response.data
          // console.log('People you may know: ', this.people)
        })
    },
    addToFriendList(friendObj) {
      axios({
        method: 'patch',
        url: 'http://localhost:8000/addFriend/'+store.state.id,
        data: {
          friend:  friendObj
        }
      })
      // console.log('Added: ', friendObj)
      
      this.userData.friends.push({friend: friendObj})
    },
    existanceInFriendList(personUsername) {
      if (!this.userData.friends) {
        return true
      }
      for (let obj of this.userData.friends) {
        if (obj.friend.username == personUsername) {
          return false
        }
      }

      return true
    }
  },
  mounted() {
    this.getPeopleYouMayKnow()
  }
}
</script>