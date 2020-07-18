<template>
  <v-container>
    <h2>{{userData.name}}'s Story
      <v-btn class="mx-50" color="primary" @click="getPosts"><v-icon>mdi-refresh</v-icon></v-btn>
    </h2>
    <v-card
      class="ma-5 pa-5"
      elevation="3"
      v-for="feed in sortedFeeds"
      :key="feed.post.time"
      tile
    >
      <v-card-title>{{feed.post.by}}'s Post</v-card-title>
      <v-card-subtitle>Posted on: {{getModifiedTime(feed.post.time)}}</v-card-subtitle>
      <v-card-text>{{feed.post.text}}</v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import store from "../store";
import axios from "axios";

export default {
  name: "Story",
  props: ["userData"],
  data() {
    return {
      feeds: [],
      postText: ""
    };
  },
  computed: {
    sortedFeeds() {
      return (this.feeds.length>0)? 
        this.feeds.slice().sort((a, b) => {
            return b.post.time - a.post.time
        }) : []
    },
  },
  methods: {
    getModifiedTime(time) {
      var date = new Date(time);
      return date.toString();
    },
    getPosts() {
      axios
        .get("http://localhost:8000/getFeedsOfFriends/" + store.state.id)
        .then(response => {
          this.feeds = response.data;
          var posts = []

          for (var ix in this.feeds) {
              for (let post of this.feeds[ix].posts) {
                  posts.push(post)
              }
          }

          posts = posts.flat()
          this.feeds=posts
          // console.log('Stories', this.feeds);
        });
    }
  },
  mounted() {
      this.getPosts()
  }
};
</script>
