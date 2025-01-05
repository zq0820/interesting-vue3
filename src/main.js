import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import interestingVue3 from "../packages";
const app = createApp(App);
app.use(interestingVue3);
app.mount("#app");
