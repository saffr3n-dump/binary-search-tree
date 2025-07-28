class Tree {
  constructor(values) {
    this.root = this.#buildTree(values);
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
  constructor(value, parent = null) {
    this.value = value;
    this.parent = parent;
    this.left = this.right = null;
  }
}
