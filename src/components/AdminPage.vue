<template>

    <v-container>

        <div> Admins</div>

        <v-row style="display: flex; max-height: 1000px; overflow: auto;">

            <v-col cols="3" v-for="(user, index) in allUsers" :key="index" :class="{'dotted':user.id === selectedUserID }" class="flex flex-col gap-2 w-full select-none card" @click="userInfo(user.id)">
                {{user.id}} --- {{selectedUserID}}

                <div >
                    <div className="aspect-square  w-full relative overflow-hidden rounded-xl  ">
                        {{user.name}} - {{ user.id }}
                    </div>
                </div>

                <!-- <div style="height: 150px;" >
                  
                </div> -->

            </v-col>
        </v-row>
        <hr style="margin:20px"/>

        <v-row  v-if="selectedUserCharts.length" style="display: flex; max-height: 1000px; overflow: auto;">
            <v-col cols="12" v-for="(chart, index) in selectedUserCharts" :key="index">
                <highcharts :options="getChartOptions(chart)"></highcharts>
            </v-col>
        </v-row>
        <div v-else class='no-charts-div'>
        <v-text class="no-charts-text">No charts added yet!</v-text>
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
            selectedUserID:User.all()[0].id
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

.dotted {
    border-style: dotted;
}

.card {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    user-select: none;
    height: 12rem;
    cursor:pointer;
    background-image: url(/images/placeholder.jpg);
}

.no-charts-div {
    height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.no-charts-text {
  font-style: italic;
  padding: 20px;
  box-shadow: 2px 2px 10px inset  black;
}

</style>