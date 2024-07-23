<template>
<<<<<<< Updated upstream
    <v-container>
      <!-- <v-btn @click="logout">Logout</v-btn> -->
      <v-btn @click="addChart">Add Chart</v-btn>
      <v-select
        v-model="selectedType"
        :items="chartTypes"
        label="Select Chart Type"
      ></v-select>
      <v-color-picker
        v-model="selectedColor"
        label="Select Line/Fill Color"
      ></v-color-picker>
      <v-select
        v-model="selectedSensors"
        :items="sensorOptions"
        label="Select Sensors"
        multiple
      ></v-select>
    </v-container>
  </template>
=======
  <v-container>
    <!-- <v-btn @click="logout">Logout</v-btn> -->

    <div class="d-flex flex-wrap">
      <v-select v-model="selectedType" :items="chartTypes" label="Select Chart Type" class="ma-3 pa-6 boxShadow"></v-select>
      <v-color-picker v-model="selectedColor" label="Select Line/Fill Color" class="ma-3 pa-6 boxShadow sm:w-100"></v-color-picker>
      <v-select v-model="selectedSensors" :items="sensorOptions" class="ma-3 pa-6 boxShadow" label="Select Sensors" multiple></v-select>
      <!-- <v-date-picker
        v-model="dateRange"
        label="Select Date"
        @change="filterChartsByDate"
      ></v-date-picker>  -->
    </div>

    <v-btn @click="addChart" class="addChartBtn" color="#4c9988">Add Chart</v-btn>
    <hr class="mb-3 bg-gray ha-2"/>

    <v-date-picker class="w-50 ma-auto" v-model="dateRange" range label="Select Date Range" @change="filterChartsByDate"></v-date-picker>
    <div v-if="filteredCharts.length">
      <v-row>
        <v-col cols="12" v-for="(chart, index) in filteredCharts" :key="index">
          <highcharts :options="getChartOptions(chart)"></highcharts>
        </v-col>
      </v-row>
    </div>
    <div v-else class='noChartsDiv'>
      <v-text class="noChartsText">No charts added yet!</v-text>
    </div>
  </v-container>
</template>
>>>>>>> Stashed changes
  
  <script>
  import User from '@/models/User'
  import Sensor from '@/models/Sensor'
  import { mapState } from 'vuex'
  // import { Chart } from 'highcharts-vue'
  
  export default {
    // components: {
    //   highcharts: Chart
    // },
    data() {
      return {
        selectedType: 'line',
        selectedColor: '#000000',
        selectedSensors: [],
        chartTypes: ['line', 'bar',"column"],
      }
    },
    mounted(){
      this.filterChartsByDate()
    },
    computed: {
      ...mapState(['entities', 'authenticatedUser']),
<<<<<<< Updated upstream
=======
      userCharts() {
        if (!this.authenticatedUser) return []
        const user = User.query().with('charts').find(this.authenticatedUser.id)
        console.log('User Charts:', user ? user.charts : [])
        // this.filterChartsByDate()
        return user ? user.charts : []
      },
>>>>>>> Stashed changes
      sensorOptions() {

        // For have specific sensors for each user to collect data from

        // if (!this.authenticatedUser) return []
        // const user = User.query().with('sensors').find(this.authenticatedUser.id)
        // return user ? user.sensors.map(sensor => ({
        //   text: `${sensor.type} - ${sensor.id}`,
        //   value: sensor.id
        // })) : []

        // for fetching all Sensors
        return  Sensor.all().map(sensor => ({
          text: `${sensor.type} - ${sensor.id}`,
          value: sensor.id
        }))

      },
    },
<<<<<<< Updated upstream
=======
    watch: {
      // selectedSensors(newVal) {
      //   console.log('Selected Sensors:', newVal)
      // },

      sensorOptions() {
        this.filterChartsByDate()
      },
      dateRange() {
        // console.log('Date Range Changed:', newVal)
        this.filterChartsByDate()
      }
    },
>>>>>>> Stashed changes
    methods: {
      logout() {
        this.$store.commit('logout')
        this.$router.push('/login')
      },
      addChart() {
        if (this.selectedSensors.length === 0) {
          alert('Please select at least one sensor.')
          return
        }
  
        const selectedSensors = this.selectedSensors.map(id => {
          const sensor = Sensor.find(id)
          console.log('Found Sensor:', sensor)
          return sensor
        }).filter(sensor => sensor)
  
        console.log('Selected Sensors:', selectedSensors)
  
        const combinedData = this.combineSensorData(selectedSensors)
                    // const dateObj = new Date();
            // const month   = dateObj.getUTCMonth() + 1; // months from 1-12
            // const day     = dateObj.getUTCDate();
            // const year    = dateObj.getUTCFullYear();

            // const newDate = year + "-" + month + "-" + day;
        const newChart = {
          type: this.selectedType,
          color: this.selectedColor,
          data: combinedData,
          createdAt: new Date().toISOString().substr(0, 10),
        }
        console.log('New Chart:', newChart)
  
        const user = User.find(this.authenticatedUser.id)
        user.$update({
          charts: [...user.charts, newChart]
        })
  
        console.log('Updated User Charts:', user)
    
      },
      combineSensorData(sensors) {
        const combinedData = sensors.map(sensor => ({
          name: sensor.type,
          data: sensor.readings
        }))
        console.log('Combined Data:', combinedData)
        return combinedData
      },
<<<<<<< Updated upstream
=======
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
      filterChartsByDate() {
        if (!Array.isArray(this.dateRange) || this.dateRange.length !== 2) {
          console.error('Invalid date range:', this.dateRange)
          return
        }
        const [start, end] = this.dateRange
        const startDate = new Date(start)
        const endDate = new Date(end)
        this.filteredCharts = this.userCharts.filter(chart => {
        //   if (!chart.dateRange || !Array.isArray(chart.dateRange) || chart.dateRange.length !== 2) {
        //     console.log("chart.dateRange")
        //     console.log(chart.dateRange)
        //     console.error('Invalid chart date range:', chart.dateRange)
        //     return false
        //   }

        // check if the created chart have date

        if (!chart.createdAt) {
            console.error('Invalid chart date range:', chart.createdAt)
            return false
          }
          const chartStartDate = new Date(chart.createdAt)
    
          // console.log(new Date(chart.dateRange))
          // console.log(startDate)
          // console.log(endDate)
          // console.log( chartStartDate >= startDate )
          // console.log(chartStartDate <= endDate)

    
        //   const [chartStart, chartEnd] = chart.dateRange
        //   const chartStartDate = new Date(chartStart)
        //   const chartEndDate = new Date(chartEnd)
        return chartStartDate >= startDate && chartStartDate <= endDate
        })
        // console.log(this.userCharts)
        // console.log('Filtered Charts:', this.filtefilteredChartsredCharts)
      }
>>>>>>> Stashed changes
    }
  }
  </script>
  
  <style scoped>

  .addChartBtn {
    background-color: rgb(76, 153, 136);
    border-color: rgb(76, 153, 136);
    display: flex;

    width: 80%;
    margin: 20px auto;
    padding: 30px;
    color: white;
  }

  .boxShadow {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
.noChartsDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20rem;
}

.noChartsText {
  padding: 20px;
<<<<<<< Updated upstream
  box-shadow: 2px 2px 10px inset  black;
=======
  /* box-shadow: 1px 1px 5px inset  black; */
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

::v-deep  canvas {
  width: 250px;
}

@media screen and (max-width: 768px) {
  ::v-deep .v-color-picker {
    display: flex;
    width: 100%;
    max-width: 100% !important;

  }
>>>>>>> Stashed changes
}
</style>