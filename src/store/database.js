import VuexORM from '@vuex-orm/core'
import User from '@/models/User'
import Sensor from '@/models/Sensor'

const database = new VuexORM.Database()
database.register(User)
database.register(Sensor)

export default database