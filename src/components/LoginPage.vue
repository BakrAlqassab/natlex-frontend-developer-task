<template>
    <v-container class="login-container">
      <v-form @submit.prevent="login">
        <v-text-field v-model="email" label="Email" type="email" clearable required></v-text-field>
        <v-text-field v-model="password" label="Password" type="password" clearable required></v-text-field>
        <v-btn type="submit" color="#19585F" class="whiteText"  aria-label="Login Button">Login</v-btn>
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

.login-container {
  width:40%;
  margin-top:5rem;
}

@media screen and (max-width: 768px) {
  .login-container {
  width:80%
}
}

</style>