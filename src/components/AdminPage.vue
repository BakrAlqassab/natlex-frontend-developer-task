<template>

    <v-container>

        <div class="title-container">
            <h2>Users</h2>
        </div>
        <v-sheet class="mx-auto" elevation="8">
    <v-slide-group
      v-model="model"
      class="pa-4 user-slide-group"
      selected-class="bg-success"
      show-arrows
    >
      <v-slide-item
        v-for="(user, index) in allUsers"
        :key="index"
    
    
      >
      
      <v-card
                :class="{
                  'active-card': user.id === selectedUserID,
                  'user-card': true,
                }"
                class="pa-6 rounded m-3"
                @click="() => selectedUserID = user.id"
              >
                <v-card-title class="d-flex align-center mb-4">
                  <v-avatar class="mr-3" color="primary" size="56">
                    <span class="white--text">{{ user.name.charAt(0) }}</span>
                  </v-avatar>
                  <div>
                    <div class="user-name"> {{ user.name }} </div>
                    <v-card-subtitle class="py-0">
                      Analytics Specialist
                    </v-card-subtitle>
                  </div>
                </v-card-title>
                <v-card-text class="user-info">
                  <strong>Email:</strong> {{ user.email }}
                </v-card-text>
                <v-card-text class="user-info">
                  <strong>Role:</strong> {{ user.role }}
                </v-card-text>
              </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
        <hr style="margin:20px" />

        <v-row class="mt-5" justify="center">
      <v-col cols="12" md="4">
        <v-sheet class="elevation-3 pa-4 date-picker-container">
          <v-date-picker
            v-model="dateRange"
            range
            color="#19585F"
            header-color="#19585F"
            class="styled-date-picker"
            @change="filterChartsByDate"
          ></v-date-picker>
        </v-sheet>


      </v-col>
    </v-row>
        <hr style="margin:20px" />
        <div class="title-container">
            <h2>Users charts</h2>
        </div>

        <v-row v-if="filteredCharts.length" class="charts">
            <v-col cols="12" v-for="(chart, index) in filteredCharts" :key="index">
                <highcharts :options="getChartOptions(chart)"></highcharts>
            </v-col>
        </v-row>
        <div v-else >
            <v-col cols="12" md="4" class="no-charts-sheet">
        <v-sheet class="elevation-3 pa-4">
          <v-row justify="center" center>
            <v-icon color="blue darken-2" large>mdi-chart-bar</v-icon>
          </v-row>
          <v-row justify="center" center>
            <p >No charts added for this user yet!</p>
          </v-row>
        </v-sheet>
      </v-col>
        </div>
    </v-container>
</template>
<script>
import User from "../models/User"
import { Chart } from 'highcharts-vue'
import ChartMixin from "../mixins/chart";

export default {
    mixins: [ChartMixin],
    components: {
      highcharts: Chart
    },
    data() {
        return {
            allUsers:User.all(),
            selectedUserCharts:User.all()[0].charts,
            selectedUserID:User.all()[0].id,
            model: null,
            dateRange: [new Date().toISOString().substr(0, 10), new Date().toISOString().substr(0, 10)],
            filteredCharts: []
        }
    },
    mounted(){
            this.adjustChartsDates()
            this.filterChartsByDate()
    },
    watch: {
        selectedUserID() {
        this.filterChartsByDate()
      },
      dateRange() {
        this.filterChartsByDate()
      }
    },
    computed: {
        userCharts() {
        if (!this.selectedUserID) return []
        const userData = User.query().with('charts').find(this.selectedUserID)

        return userData ? userData.charts : []
      },
    },
}

</script>
<style scoped>

.date-picker-container {
    margin-bottom:2rem
}

::v-deep  .v-card__title {
    padding: 8px 16px !important;
}

::v-deep  .v-card__text {
    padding: 4px 16px !important;
}

.active {
    border:solid 1px black;
}

.title-container{
    margin: 20px 0;
    padding: 10px;
}

.user-slide-group {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: auto;
  padding: 16px;
}

.user-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  border-radius: 12px;
  background: linear-gradient(145deg, #ffffff, #e6e6e6);
  box-shadow: 6px 6px 12px #d1d1d1, -6px -6px 12px #ffffff;
  min-height: 200px;
}

.user-card:hover {
  transform: translateY(-5px);
  box-shadow: 8px 8px 16px #d1d1d1, -8px -8px 16px #ffffff;
}

.active-card {
  border: 2px solid #42a5f5;
  box-shadow: 0 0 15px rgba(66, 165, 245, 0.4);
}

.v-card-title {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.user-name {
  font-size: 18px;
  font-weight: 700;
  color: #424242;
}

.user-info {
  font-size: 16px;
  color: #616161;
}

.v-avatar {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.pa-6 {
  padding: 24px;
}

.mr-3 {
  margin-right: 16px;
}
::v-deep .styled-date-picker ,::v-deep .v-picker__body{

width:100% !important
}

.no-charts-sheet {
    margin:auto
}

.charts {
  display: flex;
   max-height: 1000px;
    overflow: auto;
}



@media screen and (max-width: 768px) {
  .card {
   width:175px;
}
}
</style>