import VuexORM from '@vuex-orm/core'
import User from '@/models/User'

const database = new VuexORM.Database()
database.register(User)

export default database