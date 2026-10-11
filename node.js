class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

function buildBalanced(sortedValues) {
  if (sortedValues.length === 0) {
    return null;
  }
  const index = Math.floor(sortedValues.length / 2);
  const newNode = new Node(sortedValues[index]);
  let leftNode = sortedValues.slice(0, index);
  let rightNode = sortedValues.slice(index + 1);
  leftNode = buildBalanced(leftNode);
  rightNode = buildBalanced(rightNode);
  newNode.left = leftNode;
  newNode.right = rightNode;

  return newNode;
}

function buildTree(array) {
  const uniqueValues = new Set(array);
  const newArray = [...uniqueValues];
  newArray.sort((a, b) => a - b);
  const tree = buildBalanced(newArray);
  return tree;
}

class Tree {
  constructor(array) {
    this.root = buildTree(array);
  }

  includes(value) {
    let current = this.root;
    while (current !== null) {
      if (value === current.data) {
        return true;
      }
      current = value > current.data ? current.right : current.left;
    }
    return false;
  }

  insert(value) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }
    let current = this.root;
    while (current !== null) {
      if (value === current.data) {
        return;
      }
      let side = value > current.data ? "right" : "left";
      if (current[side] === null) {
        current[side] = new Node(value);
        return;
      }
      current = current[side];
    }
  }
  deleteItem(value) {
    let current = this.root;
    let parent = null;
    while (current !== null) {
      if (value === current.data) {
        break;
      }
      parent = current;
      current = value > current.data ? current.right : current.left;
    }

    if (current === null) {
      return;
    }
    if (current.left !== null && current.right !== null) {
      let successorParent = current;
      let successor = current.right;

      while (successor.left !== null) {
        successorParent = successor;
        successor = successor.left;
      }
      current.data = successor.data;
      parent = successorParent;
      current = successor;
    }
    const replacement = current.left !== null ? current.left : current.right;
    if (parent === null) {
      this.root = replacement;
      return;
    }
    const side = parent.left === current ? "left" : "right";
    parent[side] = replacement;
  }
}

const test = new Tree([2, 4, 6, 8, 10, 12, 14]);
test.insert(11);
test.deleteItem(8);
console.dir(test.root, { depth: null });
