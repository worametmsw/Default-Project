const moment = require('moment-timezone');
export default ({ app }, inject) => {
  // Inject into context, Due instances, and Vuex store
  inject('moment_timezone', moment)
}