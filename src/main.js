import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store.js'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VeeValidate from 'vee-validate'
import {library} from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Multiselect from 'vue-multiselect'
import 'vue-awesome/icons'
import BootstrapVue from 'bootstrap-vue'
import VueAxios from 'vue-axios'

// import the styles
import 'vue-good-table/dist/vue-good-table.css'
import {
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faHome
} from '@fortawesome/free-solid-svg-icons'
import Axios from "axios";

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

library.add(
    faUser,
    faUserSecret,
    faUserPlus,
    faSignInAlt,
    faSignOutAlt,
    faHome)
Vue.config.productionTip = false
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('multi-select', Multiselect)
Vue.use(Multiselect)
// Vue.component("FormulateInput", "FormulateInput");
// Vue.component("FormulateForm", "FormulateForm");

Vue.use(VeeValidate, {
  inject: true,
  fieldsBagName: 'veeFields'
});

Vue.use(Vuetify, VueAxios);

Vue.use(BootstrapVue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
