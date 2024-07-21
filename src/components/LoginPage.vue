<template>
    <v-container>
      <v-form @submit.prevent="login">
        <v-text-field v-model="email" label="Email" required></v-text-field>
        <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
        <v-btn type="submit" color="#4c9988" class="whiteText">Login</v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      login() {
        // Handle login logic here
      }
    }
  }
  </script>
  
<style scoped>
.whiteText {
  color: white !important;
}

</style>