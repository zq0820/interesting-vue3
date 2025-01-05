<template>
  <div
    class="vue-virtual-scroll-container"
    @scroll="scroll"
    :style="{ height: height + 'px', width: width + 'px' }"
  >
    <div
      class="vue-virtual-scroll-container-real"
      :style="{ height: heightReal + 'px', width: '100%' }"
    >
      <div :style="{ position: 'absolute', top: `${top}px`, width: '100%' }">
        <slot :virtualList="virtualList" :itemHeight="itemHeight"></slot>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, watch, nextTick } from "vue";
let virtualList = reactive([]);
let scrollOffset = ref(0);
let heightReal = ref(0);
let top = ref(0);
let itemCount = ref(0);
const props = defineProps({
  list: {
    type: Array,
    default() {
      return [];
    },
  },
  itemHeight: { type: Number, default: 40 }, //单个高度
  height: { type: Number, default: 200 },
  width: { type: Number, default: 200 },
});
const scroll = async (event) => {
  const { scrollTop } = event.target;
  scrollOffset.value = scrollTop;
  await nextTick();
  getCurrent();
};
const getCurrent = () => {
  // 可视区起始索引
  const startIndex = Math.floor(scrollOffset.value / props.itemHeight);
  // 上缓冲区起始索引
  const finialStartIndex = Math.max(0, startIndex - 2);
  // 可视区能展示的元素的最大个数
  const numVisible = Math.ceil(props.height / props.itemHeight);
  // 下缓冲区结束索引
  const endIndex = Math.min(itemCount.value - 1, startIndex + numVisible + 2);
  virtualList = props.list.slice(finialStartIndex, endIndex);
  // 在这需要获得一个可以被itemHeight整除的数来作为item的偏移量，这样随机滑动时第一条数据都是完整显示的
  const offsetY = startIndex * props.itemHeight;
  top.value = offsetY;
};

watch(
  props.list,
  async (newValue, oldValue) => {
    heightReal.value = props.itemHeight * newValue.length;
    itemCount.value = newValue.length;
    await nextTick();
    getCurrent();
  },
  { immediate: true }
);
</script>

<style scoped>
.vue-virtual-scroll-container {
  border: 1px solid black;
  position: relative;
  overflow: auto;
}
/* 滚动条样式 */
.vue-virtual-scroll-container::-webkit-scrollbar {
  width: 6px; /*  设置纵轴（y轴）轴滚动条 */
  height: 6px; /*  设置横轴（x轴）轴滚动条 */
}
/* 滚动条滑块（里面小方块） */
.vue-virtual-scroll-container::-webkit-scrollbar-thumb {
  border-radius: 20px;
  box-shadow: inset #ebebeb;
  background: #b6b5b5;
}
/* 滚动条轨道 */
.vue-virtual-scroll-container::-webkit-scrollbar-track {
  border-radius: 10px;
  box-shadow: inset #ebebeb;
  background: #ebebeb;
}

</style>
