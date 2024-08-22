<template>
  <v-app>
    <v-app-bar app color="#19485F" dark>
      <v-btn v-if="!isAuthenticated" to="/login" text>Login</v-btn>
      <v-btn v-if="!isAuthenticated" to="/register" text>Register</v-btn>
      <v-btn v-if="isAuthenticated" to="/dashboard" text>Dashboard</v-btn>
      <v-btn v-if="isAuthenticated" to="/admin" text>Admin</v-btn>
   
      <v-spacer></v-spacer>
      <div class="align-center" style="padding: 15px;">
        <v-btn to="/" text color="#D9E0A4">
      
      <v-toolbar-title class="logo-title text-subtitle-2 text-md-h6">
        <v-icon left class="logo-icon animate-logo">mdi-chart-line</v-icon>
        <span class="animate-logo ">Vue-charts</span>
      </v-toolbar-title>
   

        </v-btn>
      </div>

      <v-spacer></v-spacer>
      <v-btn v-if="isAuthenticated" label="logout Btn" @click="logout" text>Logout</v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

import { mapGetters } from 'vuex'


export default {
  name: 'App',
  computed: {
    ...mapGetters(['isAuthenticated'])
  },

  methods: {
    logout() {
      this.$store.commit('logout')
      localStorage.removeItem('token');
      this.$router.push('/login')
    }
  },
  data: () => ({
    //
  }),
};
</script>


