import "./assets/css/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
// import ToastPlugin from "vue-toast-notification";

const app = createApp(App);

app.use(router);
app.use(VueAxios, axios);
app.use(ToastPlugin);

app.mount("#app");
