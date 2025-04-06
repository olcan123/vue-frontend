import "./assets/main.css";
import "vue-toastification/dist/index.css";

import { createApp } from "vue";
import pinia from "@/plugins/pinia.plugin";
import primevuePlugin from "@/plugins/primevue.plugin";
import Toast from "vue-toastification";

import App from "./App.vue";
import router from "./router";

const options = {
  timeout: 1500,
};

const app = createApp(App);

app.use(primevuePlugin);

app.use(pinia);
app.use(router);
app.use(Toast, options);

app.mount("#app");
