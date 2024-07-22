import User from '@/models/User'
import Sensor from '@/models/Sensor'

export const initializeData = () => {
User.insert({
    data: {
      id: 1,
      name: 'Bakr',
      email: 'alqassab31@gmail.com',
     password: 'password',
      charts: [],
    }
  })

  // in fututre this data can come from Real DB
  
  Sensor.insert({
    data: [
      {
        id: 1,
        type: 'temperature',
        readings: [22, 23, 21, 22, 24, 23, 25]
      },
      {
        id: 2,
        type: 'humidity',
        readings: [45, 44, 43, 46, 47, 48, 49]
      },
      {
        id: 3,
        type: 'light',
        readings: [300, 320, 310, 330, 340, 350, 360]
      }
    ]
  })
}

