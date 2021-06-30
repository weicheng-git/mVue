import { effect } from "../node_modules/@vue/reactivity/dist/reactivity.esm-browser.js";
import { mountElement } from "./render.js";

export function createApp(rootComponent) {
  // app
  return {
    mount(rootContainer) {
      const result = rootComponent.setup();
      const rootElement = document.querySelector(rootContainer);
      effect(() => {
        // vnode -> dom element
        mountElement(rootComponent.render(result), rootElement);
      });
    },
  };
}
