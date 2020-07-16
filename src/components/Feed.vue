<template>
  <v-container>
    <v-card
      class="ma-10 pa-10"
      elevation="5"
    >
    <v-card-title class="headline">Make a post Here</v-card-title>
      <v-text-field v-model="postText" placeholder="Write what's in your mind..."></v-text-field>
      <v-btn color="primary" @click="postFeed(postText)">Post</v-btn>
    </v-card>

    <v-divider></v-divider>
    <h3>Feeds</h3>
    <v-card
      class="ma-5 pa-5"
      elevation="3"
      v-for="feed in reversedFeeds"
      :key="feed.post.time"
      tile
    >
      <v-card-title>{{feed.post.by}}'s Post</v-card-title>
      <v-card-subtitle>Posted on: {{getData(feed.post.time)}}</v-card-subtitle>
      <v-card-text>{{feed.post.text}}</v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import store from '../store'
import axios from "axios";

export default {
  name: 'Feed',
  props: ['userData'],
  data() {
    return {
      feeds: this.userData.posts,
      postText: '',
    }
  },
  computed: {
    reversedFeeds() {
      return (this.feeds)? this.feeds.slice().reverse() : []
    }
  },
  methods: {
    postFeed(postText)
    {
      const postTime = Date.now()
      console.log('Time: ', postTime)
      var postData = {
        text: postText,
        by: store.state.id,
        time: postTime
      }
      this.feeds.push({post: postData})

      axios({
        method: 'patch',
        url: 'http://localhost:8000/postFeed/'+store.state.id,
        data: {
          post: postData
        }
      })
    },
    getData(time) {
      var date = new Date(time)
      return date.toString()
    },
    getPosts() {
      axios.get('http://localhost:8000/getFeeds/'+store.state.id).then(
        (posts) => {
          this.feeds = posts.data
          console.log('Mounted Feed: ',this.feeds)
        }
      )
    }
  },
  mounted() {
    this.getPosts()
  }
}
</script>
