import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import request from "./request";

import './assets/css/reset.css'
import './assets/js/flexible'

Vue.config.productionTip = false;
Vue.prototype.$http = request;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
