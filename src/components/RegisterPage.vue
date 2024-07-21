<template>
    <v-container>
      <v-form @submit.prevent="register">
        <v-text-field v-model="name" label="Name" required></v-text-field>
        <v-text-field v-model="email" label="Email" required></v-text-field>
        <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
        <v-btn type="submit" class="whiteText" color="#4c9988" >Register</v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script>  
    import User from "@/models/User"
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: ''
      }
    },
    methods: {
        register() {
             // Handle register logic here
             console.log("register clicked")

             User.insert({
                data:{
                    name:this.name,
                    email:this.email,
                    password: this.password
                }
              
             })
             this.$router.push("/login")
      }
    }
  }
  </script>

<style scoped>
  .whiteText {
    color: white !important;
  }

</style>
  