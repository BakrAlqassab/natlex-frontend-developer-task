<template>
    <v-container>
      <v-row class="text-center">
        <v-col cols="12" class="logo">  
            <v-img
            src="https://static.tildacdn.one/tild3233-6662-4763-a335-326231643561/_1.png"
            class="my-3 mx-auto"
            contain
            height="100"
            width="200"
      
          />
        </v-col>
  
        <v-col class="mb-4 d-flex flex-column">
          <h2 class=" font-weight-bold mb-3 ma-auto pa-10">
            Natlex develops web and mobile applications that used on construction sites anywhere from Canada to Singapore.
          </h2>    
            <br>
            <v-btn outlined class="aboutusBtn"  aria-label=" REdiect to the abous page">
                <a
              href="https://natlex.fi/#rec548962821"
              target="_blank"
              color="red"
            >More about us</a>
            </v-btn>         
          <!-- </p> -->
          <span>To start using the app, please <v-btn text to="/register"  aria-label="Register new user btn" >create an account</v-btn> ,and create new charts and check the other accounts statistics</span>

        </v-col>
        </v-row>
    </v-container>
  </template>
  
  <script>
   import { mapState } from 'vuex'
    export default {
      name: 'HomeView',
      ...mapState(['entities', 'authenticatedUser']),
  
      data: () => ({
      }),
    }
</script>
<style scoped>

.container {
    background-image: url(https://static.tildacdn.one/tild3862-3531-4835-a331-633462653930/world-map0da17775.svg);
    background-position: center;
    height: 100%;
}

.aboutusBtn {
    width: 220px;
    padding: 20px;
    margin: 20px auto;
}

.logo {
 box-shadow: rgba(0, 0, 0, 0.10) 0px 5px 15px;
}
</style>
  