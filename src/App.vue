<script setup>
import { onMounted, reactive, ref } from "vue";
import Logos from "../public/AIX1.jpg";
const list = reactive([]);
const Logo = ref(Logos);
onMounted(() => {
  for (let i = 0; i < 100; i++) {
    list.push(i);
  }
});
</script>

<template>
  <VirtualScroll :list="list" :height="400" :width="200" :itemHeight="30">
    <template v-slot="slotProps">
      <div
        v-for="(item, index) in slotProps.virtualList"
        :key="index"
        :style="{ height: slotProps.itemHeight + 'px' }"
        class="item"
      >
        {{ item }}
      </div>
    </template>
  </VirtualScroll>
  <Magnifier :src="Logo"></Magnifier>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
