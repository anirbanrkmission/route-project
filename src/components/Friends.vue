<template>
  <v-container>
    <h2>{{userData.name}}'s friends</h2><br />

    <v-card
      class="d-inline-block mx-auto"
      elevation="5"
      v-for="obj in userData.friends"
      :key="obj.friend.username"
    >
      <v-card-title>{{obj.friend.name}}</v-card-title>
      <v-card-subtitle>{{obj.friend.username}}</v-card-subtitle>
    </v-card>
    <br />
    <br />

    <h2>People you may know</h2>
    <br />
    <v-card
      class="d-inline-block mx-auto"
      elevation="5"
      v-for="person in filteredPeople"
      :key="person._id"
    >
      <v-card-title>
        <v-avatar>
          <v-icon>mdi-account</v-icon>
        </v-avatar>
        {{person.name}}
      </v-card-title>
      <v-card-subtitle>{{person.username}}</v-card-subtitle>
      <v-card-actions>
        <v-btn color="primary" @click="sendFriendRequest(person)">Add Friend</v-btn>
      </v-card-actions>
    </v-card>
    
    <br /><br />
    <h2>{{userData.name}}'s Received Friend Requests</h2>
    <v-card
      class="mx-auto"
      elevation="6"
      v-for="requestObj in requestList"
      :key="requestObj.request.requestBy.username"
    >
      <v-card-title>{{requestObj.request.requestBy.name}}</v-card-title>
      <v-card-subtitle
        v-if="requestObj.request.requestTo.accepted"
      >@{{requestObj.request.requestBy.username}} is your friend now</v-card-subtitle>
      <v-card-subtitle v-else>wants friendship wtih you</v-card-subtitle>
      <v-card-action v-if="!requestObj.request.requestTo.accepted">
        <v-btn color="primary" @click="acceptRequest(requestObj.request.requestBy.username)">Accept</v-btn>
        <v-btn
          color="primary"
          class="mx-5"
          outlined
          @click="removeRequest(requestObj.request.requestBy.username)"
        >Remove</v-btn>
      </v-card-action>
    </v-card>

    <br/>
    <h2>{{userData.name}}'s Sent Friend Requests</h2>
    <v-card
      class="d-inline-block mx-auto"
      elevation="5"
      v-for="sentObj in requestedPeopleList"
      :key="sentObj.sent.username"
    >
      <v-card-title>{{sentObj.sent.name}}</v-card-title>
      <v-card-subtitle>@{{sentObj.sent.username}}</v-card-subtitle>
      <!--v-card-action v-if="!sentObj.sent.accepted">
        <v-btn color="primary">Accept</v-btn>
        <v-btn color="primary" class="mx-5" outlined>Remove</v-btn>
      </v-card-action-->
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import store from "../store";

export default {
  name: "Friends",
  props: ["userData"],
  data() {
    return {
      people: [],
      requestList: [
        {
          request: {
            requestTo: {
              username: "anirbanrkmission",
              name: "Anirban",
              accepted: false
            },
            requestBy: {
              username: "anupbal3763",
              name: "Anup Bal"
            }
          }
        },
        {
          request: {
            requestTo: {
              username: "anirbanrkmission",
              name: "Anirban",
              accepted: true
            },
            requestBy: {
              username: "munmun",
              name: "Munmun Bal"
            }
          }
        }
      ],
      requestedPeopleList: [
        {
          sent: {
            username: "harsh",
            name: "Harsh",
            accepted: false
          }
        },
        {
          sent: {
            username: "jully",
            name: "Jully",
            accepted: true
          }
        }
      ]
    };
  },
  computed: {
    filteredPeople() {
      return this.people.filter(personObj => {
        return (
          personObj.username != store.state.id &&
          this.existanceInFriendList(personObj.username) &&
          this.existanceInRequestedPeopleList(personObj.username) &&
          this.existanceInRequestList(personObj.username)
        );
      });
    }
  },
  methods: {
    getPeopleYouMayKnow() {
      axios.get("http://localhost:8000/getAllPeople").then(response => {
        this.people = response.data;
        console.log("People you may know: ", this.people);
      });
    },
    addToFriendList(friendObj) {
      axios({
        method: "patch",
        url: "http://localhost:8000/addFriend/" + store.state.id,
        data: {
          friend: friendObj
        }
      });
      console.log("Added: ", friendObj);

      this.userData.friends.push({ friend: friendObj });
    },
    existanceInFriendList(personUsername) {
      if (!this.userData.friends) {
        return true;
      }
      for (let obj of this.userData.friends) {
        if (obj.friend.username == personUsername) {
          return false;
        }
      }

      return true;
    },
    existanceInRequestedPeopleList(personUsername) {
      if (!this.userData.requestedPeopleList) {
        return true;
      }
      for (let sentObj of this.userData.requestedPeopleList) {
        if (sentObj.sent.username == personUsername) {
          return false;
        }
      }

      return true;
    },
    existanceInRequestList(personUsername) {
      if (!this.userData.requestList) {
        return true;
      }
      for (let requestObj of this.userData.requestList) {
        if (requestObj.request.requestTo.username == personUsername) {
          return false;
        }
      }

      return true;
    },
    sendFriendRequest(personObj) {
      let requestObj = {
        requestTo: {
          username: personObj.username,
          name: personObj.name,
          accepted: false
        },
        requestBy: {
          username: this.userData.username,
          name: this.userData.name
        }
      };
      let sentObj = {
        sent: requestObj.requestTo
      }
      this.userData.requestedPeopleList.push(sentObj);
      axios({
        method: "PATCH",
        url: "http://localhost:8000/sendRequest/",
        data: {
          request: requestObj
        }
      });
      console.log("Request sent to: ", personObj);
    },
    acceptRequest(requestUsername) {
    },
    removeRequest(requestUsername) {
      
    },
  },
  mounted() {
    this.getPeopleYouMayKnow();
  }
};
</script>