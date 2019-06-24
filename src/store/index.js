import Vue from 'vue'
import Vuex from 'vuex'


// Modules
import auth from './auth'
import handleMeetups from './handleMeetups'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    handleMeetups,
    auth
  }
});
   

 
