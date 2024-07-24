<template>

    <v-container>

        <div class="title-container">
            <h2>Users</h2>
        </div>
        <v-sheet class="mx-auto" elevation="8">
            <v-slide-group v-model="model" class="pa-4" selected-class="bg-success" show-arrows>
                <v-slide-item v-for="(user, index) in allUsers" :key="index" class="d-flex">
                    <v-card cols="2" 
                        :class="{'active':user.id === selectedUserID }" class=" pa-2 rounded m-2 card flex-column "
                        @click="()=>selectedUserID = user.id">
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
                </v-slide-item>
            </v-slide-group>
        </v-sheet>
        <hr style="margin:20px" />
        <v-date-picker class="w-50 ma-auto" v-model="dateRange" range label="Select Date Range"
        @change="filterChartsByDate"></v-date-picker>
        <hr style="margin:20px" />
        <div class="title-container">
            <h2>Users charts</h2>
        </div>

        <v-row v-if="filteredCharts.length" style="display: flex; max-height: 1000px; overflow: auto;">
            <v-col cols="12" v-for="(chart, index) in filteredCharts" :key="index">
                <highcharts :options="getChartOptions(chart)"></highcharts>
            </v-col>
        </v-row>
        <div v-else class='noChartsDiv'>
             <span class="noChartsText">No charts added for this user yet!</span>
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