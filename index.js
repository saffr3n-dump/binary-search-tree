class Node {
  constructor(value, parent = null) {
    this.value = value;
    this.parent = parent;
    this.left = this.right = null;
  }
}
