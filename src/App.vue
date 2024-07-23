<template>
  <v-app>
    <v-app-bar app color="#4c9988" dark>
      <v-btn v-if="!isAuthenticated" to="/login" text>Login</v-btn>
      <v-btn v-if="!isAuthenticated" to="/register" text>Register</v-btn>
      <v-btn v-if="isAuthenticated" to="/dashboard" text>Dashboard</v-btn>
      <v-btn v-if="isAuthenticated" to="/admin" text>Admin</v-btn>
   
      <v-spacer></v-spacer>
      <div class="hidden-sm-and-down align-center" style="box-shadow: 0px 0px 8px lightblue inset; padding: 15px;">
        <v-btn to="/" text color="#4c9988">
          <v-img alt="Vuetify Name" :elevation="20" class="shrink mt-1 hidden-sm-and-down" contain min-width="100"
            src="https://static.tildacdn.one/tild3233-6662-4763-a335-326231643561/_1.png" width="150" />
        </v-btn>
      </div>

      <v-spacer></v-spacer>
      <v-btn v-if="isAuthenticated" @click="logout" text>Logout</v-btn>
      <!-- <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn> -->
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
      this.$router.push('/login')
    }
  },
  data: () => ({
    //
  }),
};
</script>
