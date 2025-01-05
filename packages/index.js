import VirtualScroll from "./components/virtual-scroll.vue";
import Magnifier from "./components/magnifier.vue";
const componentsList = {
  VirtualScroll,
  Magnifier,
};
const install = (Vue) => {
  Object.keys(componentsList).forEach((key) => {
    Vue.component(key, componentsList[key]);
  });
};
export default {
  install,
};
export { VirtualScroll };
