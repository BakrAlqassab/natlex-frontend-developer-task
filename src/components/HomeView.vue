<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" sm="6" md="4">
        <router-link :to="{ name: 'DashboardPage' }">
        <v-card>
          <v-card-title>Line Cahrt</v-card-title>
          <v-card-subtitle>Project A</v-card-subtitle>

          <v-img src="/images/line_chart.png" alt="Temperature chart" aspect-ratio="1.7"></v-img>

        </v-card>
      </router-link>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <router-link :to="{ name: 'DashboardPage' }">
        <v-card>
          <v-card-title>Bar Chart</v-card-title>
          <v-card-subtitle>Project B</v-card-subtitle>
          <v-card-text>
            <v-img src="/images/bar_chart.png" alt="Humidity chart" aspect-ratio="1.7"></v-img>
          </v-card-text>
        </v-card>
      </router-link>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <router-link :to="{ name: 'DashboardPage' }">
          <v-card>
            <v-card-title>Column Chart</v-card-title>
            <v-card-subtitle>Project C</v-card-subtitle>
            <v-card-text>
              <v-img src="/images/column_chart.png" alt="Pressure chart" aspect-ratio="1.7"></v-img>
            </v-card-text>
          </v-card>
        </router-link>
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
  