import { createApp } from "vue";
import { createVuetify } from "vuetify";
import VueClipboard from "vue-clipboard3";
import App from "./App.vue";

const vuetify = createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#F8F8F2",
          secondary: "#BD93F9",
          accent: "#8BE9FD",
          error: "#FF5555",
          info: "#FF79C6",
          success: "#50FA7B",
          warning: "#FFB86C"
        }
      }
    }
  }
});

const app = createApp(App);

app.use(vuetify);
app.use(VueClipboard);

app.mount("#app");
