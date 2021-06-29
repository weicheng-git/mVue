// app => component
import { ref } from "./core/index.js";

export const App = {
  render(context) {
    const div = document.createElement("div");
    // div.innerHTML = context.count.value;

    // 对比两次结果
    // 引入中间层 -> vdom diff
    const p = document.createElement("p");
    p.innerText = "Hello";

    const p1 = document.createElement("p");
    p1.innerText = context.count.value;

    div.appendChild(p);
    div.appendChild(p1);
    return div;
  },
  setup() {
    const count = ref(0);

    window.count = count;
    return {
      count,
    };
  },
};
