<template>
  <v-container>
    <!-- <v-btn @click="logout">Logout</v-btn> -->

    <div class="d-flex flex-wrap">
      <v-select v-model="selectedType" :items="chartTypes" label="Select Chart Type"
        class="ma-3 pa-6 boxShadow"></v-select>
      <v-color-picker v-model="selectedColor" label="Select Line/Fill Color"
        class="ma-3 pa-6 boxShadow"></v-color-picker>
      <v-select v-model="selectedSensors" :items="sensorOptions" class="ma-3 pa-6 boxShadow" label="Select Sensors"
        multiple></v-select>
    </div>

    <v-btn @click="addChart" class="addChartBtn" color="#4c9988">Add Chart</v-btn>
    <hr class="mb-3 bg-gray ha-2" />

    <v-date-picker class="w-50 ma-auto" v-model="dateRange" range label="Select Date Range"
      @change="filterChartsByDate"></v-date-picker>
    <div v-if="filteredCharts.length">
      <v-row>
        <v-col cols="12" v-for="(chart, index) in filteredCharts" :key="index">
          <highcharts :options="getChartOptions(chart)"></highcharts>
        </v-col>
      </v-row>
    </div>
    <div v-else class='noChartsDiv'>
      <span class="noChartsText">No charts added yet!</span>
    </div>
  </v-container>
</template>
  
  <script>
  import User from '@/models/User'
  import Sensor from '@/models/Sensor'
  import { mapState } from 'vuex'
  import { Chart } from 'highcharts-vue'
  import ChartMixin from "../mixins/chart";
  
  export default {
    mixins: [ChartMixin],
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
    mounted(){
      this.adjustChartsDates()
      this.filterChartsByDate()
    },
    computed: {
      ...mapState(['entities', 'authenticatedUser']),
      userCharts() {
        if (!this.authenticatedUser) return []
        const user = User.query().with('charts').find(this.authenticatedUser.id)
     
        return user ? user.charts : []
      },
      sensorOptions() {

        // For have specific sensors for each user to collect data from
        // to do that just add array called "sensors" in the model/User and add the values in the initialValues actions.js, or have new UI Fields for that
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

      },
    },
    watch: {
      sensorOptions() {
        this.filterChartsByDate()
      },
      dateRange() {
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

        // this.selectedSensors represent the selected Sensor's drop-down ID's

        const selectedSensors = this.selectedSensors.map(id => {
          const sensor = Sensor.find(id)
        
          return sensor
        }).filter(sensor => sensor)
  
        // after check the drop-down id's, will fetch the related data based on the ID's
  
        const combinedData = this.combineSensorData(selectedSensors)
        const newChart = {
          type: this.selectedType,
          color: this.selectedColor,
          data: combinedData,
          createdAt: new Date().toISOString().substr(0, 10),
        }
        // collect the inserted data and add the current date
  
        const user = User.find(this.authenticatedUser.id)
        user.$update({
          charts: [...user.charts, newChart]
        })
  

        // Emit changes to local storage, this will be active for the other tabs
        localStorage.setItem('my-vuex-store', JSON.stringify(this.$store.state));
  
        // Update filtered charts, this when add new charts
        this.filterChartsByDate()
  
        // Force reactivity method forces a re-render of the Vue applicatio
        this.$forceUpdate()
      },
      combineSensorData(sensors) {
        const combinedData = sensors.map(sensor => ({
          name: sensor.type,
          data: sensor.readings
        }))
      
      // Re-Structure the sensors data to match the charts requirements data

        return combinedData
      },
    }
  }
  </script>
  <style scoped>

  .addChartBtn {
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
}
</style>