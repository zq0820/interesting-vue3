# Interesting-Vue3

Interesting-Vue3 Some of the encountered components are recorded

## Installation

Install via npm or yarn or pnpm:

```bash
npm i interesting-vue3

```

## Usage

Import and register the plugin in main.js or main.ts:

```javascript
import { createApp } from "vue";
import App from "./App.vue";
import interestingVue3 from "interesting-vue3";
import "interesting-vue3/interesting-vue3.css";
const app = createApp(App);
app.use(interestingVue3);
app.mount("#app");
```

Then, you can use the component in your template:

```vue
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

<script setup></script>

# Contributing If you'd like to contribute to this project, please fork the
repository and submit a pull request.
```
