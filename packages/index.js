import VirtualScroll from "./components/virtual-scroll.vue";
const componentsList = {
  VirtualScroll,
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
