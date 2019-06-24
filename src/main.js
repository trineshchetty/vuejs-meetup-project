import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import dateFilter from './filters/date'
import firebase from './firebase/firebaseConf'

// Shared Components
import alertCmp from './components/shared/alert'
import editMeetupModal from './components/Meetups/edit/editMeetupDetailsDialogue'
import editMeetupDateModal from './components/Meetups/edit/editMeetupDateDialog'


Vue.filter('date', dateFilter)
Vue.config.productionTip = false

console.log(Vue)

// Helpers
import colors from 'vuetify/es5/util/colors'


// Global Component Regiser
Vue.component('app-alerts', alertCmp)
Vue.component('edit-meetup-modal', editMeetupModal)
Vue.component('edit-meetup-date-modal', editMeetupDateModal)

Vue.use(vuetify, {
  theme: {
    primary: colors.indigo.darken4,
    secondary: colors.amber.lighten1,
    tertiary: colors.orange.darken1,
    white: colors.shades.white
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        store.dispatch('autoSignIn', firebaseUser)
      }
      store.dispatch('getLoadedMeetups')
    })
  }
}).$mount("#app")