<template>
  <v-container>
    <!-- <v-btn @click="logout">Logout</v-btn> -->

    <v-row class="mb-5" justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-3">
          <v-select v-model="selectedType" :items="chartTypes" label="Select Chart Type"
            class="ma-3 pa-6 boxShadow"></v-select>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" >
        <v-card class="pa-3">
          <v-color-picker v-model="selectedColor" label="Select Line/Fill Color"
            class="ma-3 pa-6 boxShadow"></v-color-picker>
        </v-card>
      </v-col>

      <v-col cols="12" md="12">
        <v-card class="pa-3">
          <v-select v-model="selectedSensors" :items="sensorOptions" class="ma-3 pa-6 boxShadow" label="Select Sensors"
            multiple></v-select>

        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="12" justify="center" class="d-flex justify-center">
      <v-btn color="#AFAFDA" dark @click="addChart" class="px-5 py-3 elevation-4 add-chart-btn">
        ADD CHART
      </v-btn>
    </v-col>
    <v-col cols="12" md="12">
      
    <hr class="my-3 bg-gray ha-2" />
    </v-col>

    </v-row>



    <v-row class="mt-5" justify="center">
      <v-col cols="12" sm="6" class="date-picker-container">
        <v-sheet class="elevation-3 pa-4 ">
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

    <div v-if="filteredCharts.length">
      <v-row>
        <v-col cols="12" v-for="(chart, index) in filteredCharts" :key="index">
          <highcharts :options="getChartOptions(chart)"></highcharts>
        </v-col>
      </v-row>
    </div>
    <div v-else class='noChartsDiv'>
      <v-col cols="12" md="4">
        <v-sheet class="elevation-3 pa-4 no-charts-sheet">
          <v-row justify="center" center>
            <v-icon color="blue darken-2" large>mdi-chart-bar</v-icon>
          </v-row>
          <v-row justify="center" center>
            <p class="no-charts-text">No charts added yet!</p>
          </v-row>
        </v-sheet>
      </v-col>
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
      dateRange(v) {
   
        console.log(v)
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

::v-deep  .v-card {
  display:flex;
justify-content:center;
}

::v-deep .styled-date-picker ,::v-deep .v-picker__body{

  width:100% !important
}


@media screen and (max-width: 768px) {
  ::v-deep .v-color-picker {
    display: flex;
    flex-direction: column;;
    width: 100%;
    max-width: 100% !important;
  }
}
</style>