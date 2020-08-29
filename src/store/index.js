import Vue from 'vue'
import Vuex from 'vuex'
// import messaging from './store-messaging'
import user from './store-user'
// import ticket from './store-ticket'

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        // messaging,
        user,
        // ticket
    }
})
