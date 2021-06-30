// app => component
import { ref, h } from "./core/index.js";

export const App = {
  render(context) {
    // 对比两次结果
    // 引入中间层 -> vdom diff
    return h("div", {}, [
      h("p", {}, context.count.value + ""),
      h("p", {}, "Hello"),
    ]);
  },
  setup() {
    const count = ref(0);

    window.count = count;
    return {
      count,
    };
  },
};
