

export default {
    methods: {
        adjustChartsDates() {
            const [start, end] = this.dateRange
            const startDate = new Date(start)
            const endDate = new Date(end)
        
            // Subtract 5 days from the start date
            startDate.setDate(startDate.getDate() - 5);
        
            // Add 5 days for the end date
            endDate.setDate(endDate.getDate() + 5);
        
            // Format the date as 'YYYY-MM-DD'
            const startDate5DaysAgo = startDate.toISOString().substr(0, 10);
            const endDate5DaysAfter = endDate.toISOString().substr(0, 10);
        
            this.dateRange = [startDate5DaysAgo,endDate5DaysAfter]
        },

        filterChartsByDate() {
            if (!Array.isArray(this.dateRange) || this.dateRange.length !== 2) {
              return
            }
            const [start, end] = this.dateRange
            const startDate = new Date(start)
            const endDate = new Date(end)
            this.filteredCharts = this.userCharts.filter(chart => {
    
            // check if the created chart have date
    
            if (!chart.createdAt) {
                console.error('Invalid chart date range:', chart.createdAt)
                return false
              }
    
              const chartStartDate = new Date(chart.createdAt)
    
            return chartStartDate >= startDate && chartStartDate <= endDate
            })
          },
          getChartOptions(chart) {    
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
        
    },
};
