import { Model } from '@vuex-orm/core'

export default class Sensor extends Model {
  static entity = 'sensors'

  static fields() {
    return {
      id: this.attr(null),
      type: this.attr(''), // 'temperature', 'humidity', 'light'
      readings: this.attr([]) // Array of readings
    }
  }
}
