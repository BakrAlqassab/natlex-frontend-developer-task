<template>
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
    computed: {
      ...mapState(['entities', 'authenticatedUser']),
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
    
      },
      combineSensorData(sensors) {
        const combinedData = sensors.map(sensor => ({
          name: sensor.type,
          data: sensor.readings
        }))
        console.log('Combined Data:', combinedData)
        return combinedData
      },
    }
  }
  </script>
  
  <style>
.no-charts-div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20rem;
}

.no-charts-text {
  padding: 20px;
  box-shadow: 2px 2px 10px inset  black;
}
</style>