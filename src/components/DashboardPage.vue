<template>
  <v-container>
    <!-- <v-btn @click="logout">Logout</v-btn> -->
    <v-btn @click="addChart" color="#4c9988">Add Chart</v-btn>
    <div class="flex">
      <v-select v-model="selectedType" :items="chartTypes" label="Select Chart Type" class="mx-2"></v-select>
      <v-color-picker v-model="selectedColor" label="Select Line/Fill Color" class="mx-2"></v-color-picker>
      <v-select v-model="selectedSensors" :items="sensorOptions" class="mx-2" label="Select Sensors" multiple></v-select>
      <!-- <v-date-picker
        v-model="dateRange"
        label="Select Date"
        @change="filterChartsByDate"
      ></v-date-picker>  -->
    </div>
    <hr style="height:10px; background-color: gray; margin-bottom: 10px;" />

    <v-date-picker v-model="dateRange" range label="Select Date Range" @change="filterChartsByDate"></v-date-picker>
    <div v-if="filteredCharts.length">
      <v-row>
        <v-col cols="12" v-for="(chart, index) in filteredCharts" :key="index">
          <highcharts :options="getChartOptions(chart)"></highcharts>
        </v-col>
      </v-row>
    </div>
    <div v-else class='no-charts-div'>
      <v-text class="no-charts-text">No charts added yet!</v-text>
    </div>
  </v-container>
</template>
  
  <script>
  import User from '@/models/User'
  import Sensor from '@/models/Sensor'
  import { mapState } from 'vuex'
  import { Chart } from 'highcharts-vue'
  
  export default {
    components: {
      highcharts: Chart
    },
    data() {
      return {
        selectedType: 'line',
        // selectedColor: '#000000',
        selectedColor: '#CF9FFF',
        selectedSensors: [],
        chartTypes: ['line', 'bar',"column"],
        dateRange: [new Date().toISOString().substr(0, 10), new Date().toISOString().substr(0, 10)],
        filteredCharts: []
      }
    },
    computed: {
      ...mapState(['entities', 'authenticatedUser']),
      userCharts() {
        if (!this.authenticatedUser) return []
        const user = User.query().with('charts').find(this.authenticatedUser.id)
        console.log('User Charts:', user ? user.charts : [])
        return user ? user.charts : []
      },
      sensorOptions() {

        // For have specific sensors for each user to collect data from
        // to do that just add array called "sensors" in the model/Sensor and add the values in the initialValues actions.js, or have new UI Fields for that
        // PReferably is coming from DB or use static one

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

      }
    },
    watch: {
      // selectedSensors(newVal) {
      //   console.log('Selected Sensors:', newVal)
      // },
      dateRange() {
        // console.log('Date Range Changed:', newVal)
        this.filterChartsByDate()
      }
    },
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
  
        console.log('Selected Sensor IDs:', this.selectedSensors)
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
  
        console.log('Updated User Charts:', user.charts)
  
        // Update filtered charts
        this.filterChartsByDate()
  
        // Force reactivity
        this.$forceUpdate()
      },
      combineSensorData(sensors) {
        const combinedData = sensors.map(sensor => ({
          name: sensor.type,
          data: sensor.readings
        }))
        console.log('Combined Data:', combinedData)
        return combinedData
      },
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
          // console.log(chart.dateRange)
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
    }
  }
  </script>
  
  <style scoped>
.no-charts-div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20rem;
}

.no-charts-text {
  padding: 20px;
  box-shadow: 1px 1px 5px inset  black;
}
</style>