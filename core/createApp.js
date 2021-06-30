import { effect } from "../node_modules/@vue/reactivity/dist/reactivity.esm-browser.js";
import { mountElement, diff } from "./render.js";

export function createApp(rootComponent) {
  // app
  return {
    mount(rootContainer) {
      const result = rootComponent.setup();

      let isMounded = false;
      let prevSubTree;

      const rootElement = document.querySelector(rootContainer);
      effect(() => {
        if (!isMounded) {
          isMounded = true;
          // init
          rootElement.innerHTML = "";
          const subTree = rootComponent.render(result);

          prevSubTree = subTree;
          // vnode -> dom element
          mountElement(subTree, rootElement);
        } else {
          const subTree = rootComponent.render(result);
          // update
          diff(prevSubTree, subTree);
          prevSubTree = subTree;
        }
      });
    },
  };
}
