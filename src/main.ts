import { createApp } from "vue";
import "../node_modules/bulma/css/bulma.min.css";
import "../node_modules/@creativebulma/bulma-tooltip/dist/bulma-tooltip.min.css";
import "@/assets/styles/style.css";
import { FontAwesomeIcon } from "@/libs/font-awesome";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import App from "@/App.vue";

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .component("VueDatePicker", VueDatePicker)
  .mount("#app");
