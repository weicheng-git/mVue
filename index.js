// vue3 基础库: reactivity
// vue3 -> composition pai
// effect -> watchEffect

// import {
//   effect,
//   ref,
//   reactive,
// } from "./node_modules/@vue/reactivity/dist/reactivity.esm-browser.js";

// effect 依赖收集 ， 触发依赖

// const a = ref(20);

// let b;
// effect(() => {
//   // 收集依赖
//   b = a.value * 10;

//   console.log(b);
// }, a);
// // 触发依赖
// a.value = 30;

// render
// function render(context) {
//   // view
//   const div = document.createElement("div");
//   const app = document.getElementById("app");

//   effect(() => {
//     div.innerHTML = context.count.value;
//   });

//   app.appendChild(div);
// }

// // setup
// // 响应式数据
// function setup() {
//   const count = ref(0);

//   window.count = count;

//   return {
//     count,
//   };
// }

// render(setup());

import { createApp } from "./core/index.js";
import { App } from "./app.js";

createApp(App).mount("#app");
