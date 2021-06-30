// render dom canvas
function createElement(type) {
  return document.createElement(type);
}

// 处理 props
function patchProps(el, key, prevValue, nextValue) {
  el.setAttribute(key, nextValue);
}

function createTextNode(children) {
  return document.createTextNode(children);
}

function insert(el, parent) {
  parent.append(el);
}

// 虚拟节点转换成真实 dom
export function mountElement(vnode, container) {
  // type
  const { type, props, children } = vnode;
  const el = (vnode.el = createElement(type));

  // props
  Object.keys(props).forEach(key => {
    const value = props[key];
    patchProps(el, key, null, value);
  });

  // childern
  // String | Array
  if (typeof children === "string") {
    // insert
    insert(createTextNode(children), el);
  } else if (Array.isArray(children)) {
    children.forEach(v => mountElement(v, el));
  }

  insert(el, container);
}
