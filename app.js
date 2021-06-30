// app => component
import { ref, h } from "./core/index.js";

export const App = {
  render(context) {
    const div = document.createElement("div");
    // 对比两次结果
    // 引入中间层 -> vdom diff
    return h("div", {}, [h("span", {}, context.count.value + "")]);
  },
  setup() {
    const count = ref(0);

    window.count = count;
    return {
      count,
    };
  },
};
