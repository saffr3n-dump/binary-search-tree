class Tree {
  constructor(values) {
    this.root = this.#buildTree(values);
  }

  insert(value) {
    let root = this.root;
    if (!root) {
      this.root = new Node(value);
      return;
    }
    while (true) {
      if (value === root.value) return;
      const path = value < root.value ? 'left' : 'right';
      if (!root[path]) {
        root[path] = new Node(value);
        return;
      }
      root = root[path];
    }
  }

  delete(value) {
    let path;
    let prev = null;
    let curr = this.root;
    if (!curr) return;
    while (true) {
      if (value === curr.value) break;
      path = value < curr.value ? 'left' : 'right';
      if (!curr[path]) return;
      prev = curr;
      curr = curr[path];
    }
    if (!curr.left || !curr.right) {
      const next = curr.left ? curr.left : curr.right;
      if (!prev) this.root = next;
      else prev[path] = next;
    } else {
      let prevSucc = curr;
      let currSucc = curr.right;
      while (currSucc.left) {
        prevSucc = currSucc;
        currSucc = currSucc.left;
      }
      curr.value = currSucc.value;
      prevSucc[prevSucc === curr ? 'right' : 'left'] = currSucc.right;
    }
  }

  find(value) {
    let curr = this.root;
    while (curr) {
      if (value === curr.value) break;
      curr = curr[value < curr.value ? 'left' : 'right'];
    }
    return curr;
  }

  levelOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('Must provide a callback function');
    }
    const queue = [this.root];
    while (queue.length) {
      const curr = queue.shift();
      if (curr.left) queue.push(curr.left);
      if (curr.right) queue.push(curr.right);
      callback(curr);
    }
  }

  inOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('Must provide a callback function');
    }
    function rec(node) {
      if (!node) return;
      rec(node.left);
      callback(node);
      rec(node.right);
    }
    rec(this.root);
  }

  preOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('Must provide a callback function');
    }
    function rec(node) {
      if (!node) return;
      callback(node);
      rec(node.left);
      rec(node.right);
    }
    rec(this.root);
  }

  postOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('Must provide a callback function');
    }
    function rec(node) {
      if (!node) return;
      rec(node.left);
      rec(node.right);
      callback(node);
    }
    rec(this.root);
  }

  #buildTree(values) {
    const norm = this.#removeDupes(values).sort((a, b) => a - b);
    return this.#buildTreeRec(norm, 0, norm.length);
  }

  #buildTreeRec(values, min, max, parent = null) {
    if (min === max) return null;
    const mid = Math.floor((max - min) / 2) + min;
    const root = new Node(values[mid], parent);
    root.left = this.#buildTreeRec(values, min, mid, root);
    root.right = this.#buildTreeRec(values, mid + 1, max, root);
    return root;
  }

  #removeDupes(values) {
    const set = new Set();
    for (const value of values) {
      set.add(value);
    }
    return Array.from(set);
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.left = this.right = null;
  }
}
