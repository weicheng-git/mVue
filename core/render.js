// render dom canvas
function createElement(type) {
  return document.createElement(type);
}

// 处理 props
function patchProps(el, key, prevValue, nextValue) {
  if (nextValue === null) {
    el.removeAttribute(key);
  }
  el.setAttribute(key, nextValue);
}

function createTextNode(children) {
  return document.createTextNode(children);
}

function insert(el, parent) {
  parent.append(el);
}

function removeElement(el, parent) {
  parent.removeChildren(el);
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
  if (Array.isArray(children)) {
    children.forEach(v => mountElement(v, el));
  } else {
    insert(createTextNode(children), el);
  }

  insert(el, container);
}

// n1: old
// n2: new
export function diff(n1, n2) {
  console.log(n1, n2);
  // type
  n1.type !== n2.type && (n2.el = n1.el.replaceWith(createElement(n2.type)));

  // props
  const { props: newProps, children: newChildren } = n2;
  const { props: oldProps, children: oldChildren } = n1;

  const el = (n2.el = n1.el);

  Object.keys(newProps).forEach(key => {
    const newVal = newProps[key];
    const oldVal = oldProps[key];

    if (newVal !== oldVal) {
      patchProps(n1.el, key, oldVal, newVal);
    }
  });
  Object.keys(oldProps).forEach(key => {
    if (!(key in newProps)) {
      patchProps(el, key, oldProps[key], null);
    }
  });
  // children
  // newChildren -> string | array
  if (typeof newChildren === "string") {
    if (typeof oldChildren === "string") {
      // 对比
      if (newChildren !== oldChildren) {
        el.textContent = newChildren;
      }
    } else if (Array.isArray(oldChildren)) {
      el.textContent = newChildren;
    }
  } else if (Array.isArray(newChildren)) {
    // reset
    el.textContent = "";
    newChildren.forEach(v => mountElement(v, el));
  } else if (Array.isArray(oldChildren)) {
    const length = Math.min(newChildren.length, oldChildren.length);

    for (let i = 0; i <= length; i++) {
      const newChild = newChildren[i];
      const oldChild = oldChildren[i];

      diff(oldChild, newChild);
    }

    if (newChildren.length > length) {
      for (let i = length; i < newChildren.length; i++) {
        mountElement(newChildren[i], el);
      }
    }

    if (oldChildren.length > length) {
      for (let i = length; i < oldChildren.length; i++) {
        removeElement(oldChildren[i].el, el);
      }
    }
  }
}
