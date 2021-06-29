import { effect } from "../node_modules/@vue/reactivity/dist/reactivity.esm-browser.js";

export * from "../node_modules/@vue/reactivity/dist/reactivity.esm-browser.js";

export function createApp(rootComponent) {
  // app
  return {
    mount(rootContainer) {
      const result = rootComponent.setup();
      const rootElement = document.querySelector(rootContainer);
      effect(() => {
        const view = rootComponent.render(result);
        // append
        rootElement.appendChild(view);
      });
    },
  };
}
