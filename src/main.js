import Vue from "vue";
import Vuetify from "vuetify";
import VueClipboard from "vue-clipboard2";
import "./plugins/vuetify";
import App from "./App.vue";

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  theme: {
    primary: "#F8F8F2",
    secondary: "#BD93F9",
    accent: "#8BE9FD",
    error: "#FF5555",
    info: "#FF79C6",
    success: "#50FA7B",
    warning: "#FFB86C"
  }
});
Vue.use(VueClipboard);

new Vue({
  render: h => h(App)
}).$mount("#app");
