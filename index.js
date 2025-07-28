class Tree {
  constructor(values) {
    this.root = this.#buildTree(values);
  }

  #buildTree(values) {
    this.#removeDupes(values).sort((a, b) => a - b);
    return this.#buildTreeRec(values, 0, values.length, null);
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
    for (let i = 0; i < values.length; ++i) {
      if (set.has(values[i])) {
        const last = values.length - 1;
        [values[i], values[last]] = [values[last], values[i]];
        values.pop();
      } else {
        set.add(values[i]);
      }
    }
    return values;
  }
}

class Node {
  constructor(value, parent = null) {
    this.value = value;
    this.parent = parent;
    this.left = this.right = null;
  }
}
