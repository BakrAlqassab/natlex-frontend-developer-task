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
  import User from "@/models/User"
  import { v4 as uuidv4 } from 'uuid';
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
        const user = User.query().where('email', this.email).where('password', this.password).first()
        if (user) {
          const token = uuidv4;
          this.$store.commit('setAuthenticatedUser', user)
          localStorage.setItem('token', token);
          localStorage.setItem('my-vuex-store', JSON.stringify(this.$store.state));
          localStorage.setItem('redirectTo', '/dashboard');
          this.$router.push('/dashboard')
        } else {
          alert('Invalid credentials')
        }
      }
    }
  }
  </script>
  
<style scoped>
.whiteText {
  color: white !important;
}

</style>