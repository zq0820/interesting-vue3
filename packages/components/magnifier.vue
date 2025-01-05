<template>
  <div
    class="main-container"
    :style="{ width: getRectWidth, height: getRectHeight }"
  >
    <img
      class="image-container"
      :src="src"
      @mouseenter="imgMouseEnter"
      @mouseleave="imgMouseLeave"
      @mousemove.stop="imgMousemove"
      :style="{ width: getRectWidth, height: getRectHeight }"
    />
    <!-- 阴影 -->
    <div
      class="rect-shadow"
      v-if="rectShadow"
      :style="{
        width: `${parseInt(width / 2)}px`,
        height: `${parseInt(height / 2)}px`,
        left: offsetX + 'px',
        top: offsetY + 'px',
      }"
      ref="imgRect"
    ></div>
    <!-- 放大 -->
    <div
      class="rect-enlarge"
      v-if="rectShadow"
      :style="{
        width: getRectWidth,
        height: getRectHeight,
        left: width + 20 + 'px',
        top: 0,
        'background-image': `url(${src})`,
        'background-position-x': BPX + '%',
        'background-position-Y': BPY + '%',
      }"
    ></div>
  </div>
</template>

<script setup>
import { reactive, ref, watch, nextTick, computed } from "vue";
let rectShadow = ref(false);
let offsetX = ref(0);
let offsetY = ref(0);
let BPX = ref(0);
let BPY = ref(0);
const props = defineProps({
  src: {
    type: String,
    default: "",
  },
  width: {
    type: Number,
    default: 100,
  },
  height: {
    type: Number,
    default: 100,
  },
});

const getRectWidth = computed(() => {
  return `${props.width}px`;
});
const getRectHeight = computed(() => {
  return `${props.height}px`;
});
const imgMouseEnter = () => {
  rectShadow.value = true;
};
const imgMousemove = (e) => {
  const { width, height } = props;
  // console.log(e, "imgMousemove");
  const overX = e.offsetX + parseInt(width / 4); //X是否超出
  const overY = e.offsetY + parseInt(height / 4); //Y是否超出

  if (overX >= width && overY >= height) {
    offsetY.value = height / 2 + height / 4;
    offsetX.value = width / 2 + width / 4;
  } else if (overX <= width / 2 && overY <= height / 2) {
    offsetY.value = height / 4;
    offsetX.value = width / 4;
  } else if (overX >= width && overY < height / 2) {
    offsetX.value = width / 2 + width / 4;
    offsetY.value = height / 4;
  } else if (overX < width / 2 && overY >= height) {
    offsetX.value = width / 4;
    offsetY.value = height / 2 + height / 4;
  } else if (overX >= width && overY < height) {
    offsetX.value = width / 2 + width / 4;
    offsetY.value = e.offsetY;
  } else if (overX < width && overY > height) {
    offsetY.value = height / 2 + height / 4;
    offsetX.value = e.offsetX;
  } else if (overX >= width / 2 && overY < height / 2) {
    offsetX.value = e.offsetX;
    offsetY.value = height / 4;
  } else if (overX < width / 2 && overY > height / 2) {
    offsetX.value = width / 4;
    offsetY.value = e.offsetY;
  } else {
    offsetX.value = e.offsetX;
    offsetY.value = e.offsetY;
  }
  nextTick(() => {
    BPX.value = (offsetX.value - width / 4) * 0.02 * 100;
    BPY.value = (offsetY.value - height / 4) * 0.02 * 100;
  });

  //   BPX.value = -e.offsetX;
  //   BPY.value = -e.offsetY;
};
const imgMouseLeave = () => {
  rectShadow.value = false;
  BPX.value = 0;
  BPY.value = 0;
};
</script>

<style scoped>
.main-container {
  position: relative;
  border: 1px solid black;
}
.image-container {
  object-fit: cover;
}
.rect-shadow {
  background: rgb(133, 128, 128);
  opacity: 0.3;
  position: absolute;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
.rect-enlarge {
  /* background: rgb(133, 128, 128); */
  position: absolute;
  border: 1px solid black;
  background-repeat: no-repeat;
  background-size: 200%;
}
</style>
