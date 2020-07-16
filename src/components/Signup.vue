<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="user.name"
      :counter="50"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="user.email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      v-model="user.password"
      :rules="pwdRules"
      label="Password"
      required
    ></v-text-field>


    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox>

    <v-btn
      :disabled="!valid"
      color="primary"
      class="mr-4"
      @click="validate"
    >
      Signup
    </v-btn>
  </v-form>
</template>

<script>
import axios from "axios";
  export default {
    data: () => ({
      valid: true,
      user: {
        name: '',
        email: '',
        password: '',
        posts: [],
        friends: []
      },
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 50) || 'Name must be less than 50 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      pwdRules: [
        v => !!v || 'Password is Required',
        v => /^[a-zA-Z0-9_]*$/.test(v) || 'Password must be valid',
      ],
      checkbox: false,
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
        this.sendProfileData(this.user)
      },
      sendProfileData(userData) {
        axios({
          method: 'post',
          url: 'http://localhost:8000/addUser/'+userData.email,
          data: {
            name: userData.name,
            username: userData.email,
            password: userData.password,
            status: true,
            posts: [],
            friends: [],
            messeges: []
          },
        })
      }
    },
  }
</script>