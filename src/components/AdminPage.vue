<template>

    <v-container>

        <div class="title-container">
            <h2>Users</h2>
        </div>
        <v-sheet class="mx-auto" elevation="8">
            <v-slide-group v-model="model" class="pa-4" selected-class="bg-success" show-arrows>
                <v-slide-group-item class="d-flex">
                    <v-card cols="2" v-for="(user, index) in allUsers" :key="index"
                        :class="{'active':user.id === selectedUserID }" class=" pa-2 rounded m-2 card "
                        @click="userInfo(user.id)">
                        <v-card-subtitle class="py-0">
                            Analytics specialist
                        </v-card-subtitle>

                        <v-card-title>
                         Name:   {{ user.name }}
                        </v-card-title>

                        <v-card-text>
                         Email:   {{ user.email }}
                        </v-card-text>
                        <v-card-text>
                        Role:    {{ user.role }}
                        </v-card-text>
                    </v-card>
                </v-slide-group-item>
            </v-slide-group>
        </v-sheet>
        <hr style="margin:20px" />
        <div class="title-container">
            <h2>Users charts</h2>
        </div>

        <v-row v-if="selectedUserCharts.length" style="display: flex; max-height: 1000px; overflow: auto;">
            <v-col cols="12" v-for="(chart, index) in selectedUserCharts" :key="index">
                <highcharts :options="getChartOptions(chart)"></highcharts>
            </v-col>
        </v-row>
        <div v-else class='noChartsDiv'>
            <v-text class="noChartsText">No charts added for this user yet!</v-text>
        </div>
    </v-container>
</template>
<script>
import User from "../models/User"
import { Chart } from 'highcharts-vue'

export default {
    components: {
      highcharts: Chart
    },
    data() {
        return {
            allUsers:User.all(),
            // selectedUserCharts:User.all()[0].charts,
            selectedUserCharts:User.all()[0].charts,
            selectedUserID:User.all()[0].id,
            model: null,
        }

      
    },
    methods: {
        getChartOptions(chart) {
        console.log('Chart Data:', chart)
        return {
          title: {
            text: 'Sensor Data Chart'
          },
          chart: {
            type: chart.type
            },
          series: chart.data.map(sensorData => ({
            name: sensorData.name,
            data: sensorData.data,
            color: chart.color
          })),
          xAxis: {
            categories: chart.data[0].data.map((_, index) => `Point ${index + 1}`)
          },
          yAxis: {
            title: {
              text: 'Values'
            }
          }
        }
      },
        userInfo(userId) {
            this.selectedUserID = userId
                console.log("cliked User");
                console.log(userId);

                if (!userId) return []
        const userData = User.query().with('charts').find(userId)
        console.log('User Charts:', userData ? userData.charts : [])
        console.log(userData.charts)
        this.selectedUserCharts = userData.charts;
        return userData ? userData.charts : []

        }
    }


}

</script>
<style scoped>

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

.card {


   width:240px;
   height:200px;
    margin:10px
}

.noChartsDiv {
    height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.noChartsText {
  padding: 20px;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
}



@media screen and (max-width: 768px) {
.card {

   width:175px;
}
}

</style>