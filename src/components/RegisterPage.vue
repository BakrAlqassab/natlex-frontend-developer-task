<template>
    <v-container>
      <v-form @submit.prevent="register">
        <v-text-field v-model="name" label="Name" required  clearable></v-text-field>
        <v-text-field v-model="email" label="Email" type="email" clearable required></v-text-field>
        <v-text-field v-model="password" label="Password" type="password" clearable required></v-text-field>
        <v-btn type="submit" class="whiteText" color="#4c9988"  aria-label="Register new user button" >Register</v-btn>
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
        password: '',
      }
    },
    methods: {
        register() {
             // Handle register logic here
             const user = User.query().where('email', this.email).first()
             if(!user) {
              User.insert({
                data:{
                    name:this.name,
                    email:this.email,
                    password: this.password,
                    role: "Admin"
                }              
             })
             } else {
              alert("already thre account with this email, Please login")
             }
          
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
  