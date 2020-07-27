<template>
  <v-container>
    <h2>{{userData.name}}'s friends <v-btn color="primary" outlined @click="getrequest()"><v-icon>mdi-refresh</v-icon></v-btn></h2>
    <br />

    <v-card
      class="d-inline-block mx-auto"
      elevation="5"
      v-for="obj in friendList"
      :key="obj.username"
    >
      <v-card-title>{{obj.name}}</v-card-title>
      <v-card-subtitle>{{obj.username}}</v-card-subtitle>
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

    <br />
    <br />
    <h2>{{userData.name}}'s Received Friend Requests</h2>
    <v-card
      class="mx-auto"
      elevation="6"
      v-for="requestObj in filteredRequestList"
      :key="requestObj.request.requestBy.username"
    >
      <v-card-title>{{requestObj.request.requestBy.name}}</v-card-title>

      <v-card-subtitle
        v-if="requestObj.request.requestTo.accepted"
      >@{{requestObj.request.requestBy.username}} is your friend now</v-card-subtitle>

      <v-card-subtitle v-else>wants friendship wtih you</v-card-subtitle>

      <v-card-actions v-if="!requestObj.request.requestTo.accepted">
        <v-btn color="primary" @click="acceptRequest(requestObj)">Accept</v-btn>
        <v-btn color="primary" class="mx-5" outlined @click="removeRequest(requestObj)">Remove</v-btn>
      </v-card-actions>
    </v-card>

    <br />
    <h2>{{userData.name}}'s Sent Friend Requests</h2>
    <v-card
      class="d-inline-block mx-auto"
      elevation="5"
      v-for="reqObj in requestedPeopleList"
      :key="reqObj.request.requestTo.username"
    >
      <v-card-title>{{reqObj.request.requestTo.name}}</v-card-title>
      <v-card-subtitle>@{{reqObj.request.requestTo.username}}</v-card-subtitle>
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
      requestList: this.userData.requests,
    };
  },
  computed: {
    filteredPeople() {
      return this.people.filter(personObj => {
        return (
          personObj.username != store.state.id &&
          !this.existanceInRequestList(personObj.username)
        );
      });
    },
    requestedPeopleList() {
      return this.requestList.filter(requestObj => {
        return (requestObj.request.requestBy.username == store.state.id &&
        !requestObj.request.requestTo.accepted);
      });
    },
    filteredRequestList() {
      return this.requestList.filter(requestObj => {
        return (requestObj.request.requestTo.username == store.state.id &&
          !requestObj.request.requestTo.accepted);
        });
    },
    friendList() {
      var reqList = this.requestList.filter(reqObj => {
        return reqObj.request.requestTo.accepted;
      });

      var friends = []

      for (let reqObj of reqList) {
        if (reqObj.request.requestBy.username == store.state.id) {
          friends.push(reqObj.request.requestTo);
        } else {
          friends.push(reqObj.request.requestBy);
        }
      }

      console.log('Friends', friends)
      return friends;
    }
  },
  methods: {
    getRequest() {
      axios.get('http://localhost:8000/getReq'+store.state.id)
      .then(reqsList => {
        this.requestList = reqsList
      })
    },
    getPeopleYouMayKnow() {
      axios.get("http://localhost:8000/getAllPeople").then(response => {
        this.people = response.data;
        console.log("People you may know: ", this.people);
      });
    },
    existanceInRequestList(personUsername) {
      for (let reqObj of this.requestList) {
        if (reqObj.request.requestBy.username == personUsername) {
          return true
        }
        else if(reqObj.request.requestTo.username == personUsername) {
          return true
        }
      }

      return false
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
      
      this.requestList.push({
        request: requestObj
      });
      axios({
        method: "PATCH",
        url: "http://localhost:8000/sendRequest/",
        data: {
          request: requestObj
        }
      })
      // console.log('Added: ', friendObj)
      
      this.userData.friends.push({friend: friendObj})
    },
    acceptRequest(requestObj) {
      for (var index in this.requestList) {
        if (requestObj.request.requestBy.username == this.requestList[index].request.requestBy.username) {
          this.requestList[index].request.requestTo.accepted = true;
          break
        }
      }

      axios({
        method: "PATCH",
        url:
          "http://localhost:8000/acceptRequest/",
        data: requestObj
      });
    },
    removeRequest(requestObj) {
      for (var index in this.requestList) {
        if (requestObj.request.requestBy.username == this.requestList[index].request.requestBy.username) {
          this.requestList.splice(index, 1)
          break
        }
      }

      console.log('Removed: ', requestObj)

      axios({
        method: "PATCH",
        url:
          "http://localhost:8000/removeRequest/",
        data: requestObj
      });
    }
  },
  mounted() {
    this.getPeopleYouMayKnow();
  }
};
</script>
