const BinarySearch = (() => {
  class Node {
    constructor(data, left = null, right = null) {
      this.data = data;
      this.left = left;
      this.right = right;
    }
  }

  function buildTree(array) {
    let arrShorted = array.sort((a, b) => a - b);
    const cleanedArray = Array.from(new Set(arrShorted));
    return buildTreeRecursive(cleanedArray, 0, cleanedArray.length - 1);
  }

  function buildTreeRecursive(arr, start, end) {
    if (start > end) return null;

    const middle = Math.floor((start + end) / 2);
    const node = new Node(arr[middle]);

    node.left = buildTreeRecursive(arr, start, middle - 1);
    node.right = buildTreeRecursive(arr, middle + 1, end);

    return node;
  }

  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) return;

    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  class Tree {
    constructor(arr) {
      this.root = buildTree(arr);
    }

    insert(value) {
      const newNode = new Node(value);
      if (this.root === null) {
        this.root = newNode;
        return;
      }

      let current = this.root;

      while (true) {
        if (value < current.data) {
          if (current.left === null) {
            current.left = newNode;
            return;
          }
          current = current.left;
        } else if (value > current.data) {
          if (current.right === null) {
            current.right = newNode;
            return;
          }
          current = current.right;
        } else {
          return;
        }
      }
    }

    deleteItem(value) {
      if (this.root === null) return null;

      let current = this.root;
      let parent = null;

      while (true) {
        if (value < current.data) {
          if (current.left === null) return null;
          parent = current;
          current = current.left;
        } else if (value > current.data) {
          if (current.right === null) return null;
          parent = current;
          current = current.right;
        } else {
          // Caso 1: sin hijos
          if (!current.left && !current.right) {
            if (parent === null) this.root = null;
            else if (parent.left === current) parent.left = null;
            else parent.right = null;
            return;
          }

          // Caso 2: un hijo izquierdo
          if (current.left && !current.right) {
            if (parent === null) this.root = current.left;
            else if (parent.left === current) parent.left = current.left;
            else parent.right = current.left;
            return;
          }

          // Caso 3: un hijo derecho
          if (!current.left && current.right) {
            if (parent === null) this.root = current.right;
            else if (parent.left === current) parent.left = current.right;
            else parent.right = current.right;
            return;
          }

          // Caso 4: dos hijos
          let successorParent = current;
          let successor = current.right;

          while (successor.left !== null) {
            successorParent = successor;
            successor = successor.left;
          }

          current.data = successor.data;

          if (successorParent === current) {
            successorParent.right = successor.right;
          } else {
            successorParent.left = successor.right;
          }

          return;
        }
      }
    }

    find(value) {
      let current = this.root;

      while (current !== null) {
        if (value < current.data) current = current.left;
        else if (value > current.data) current = current.right;
        else return current;
      }

      return null;
    }

    levelOrderForEach(callback) {
      if (!this.root) return;

      const queue = [this.root];

      while (queue.length > 0) {
        const node = queue.shift();
        callback(node);

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
    }

    inOrderForEach(callback) {
      if (typeof callback !== "function") {
        throw new Error("Callback is required for inOrderForEach");
      }

      function traverse(node) {
        if (node === null) return;

        traverse(node.left);
        callback(node);
        traverse(node.right);
      }

      traverse(this.root);
    }

    preOrderForEach(callback) {
      if (typeof callback !== "function") {
        throw new Error("Callback is required for preOrderForEach");
      }

      function traverse(node) {
        if (node === null) return;

        callback(node);
        traverse(node.left);
        traverse(node.right);
      }

      traverse(this.root);
    }

    postOrderForEach(callback) {
      if (typeof callback !== "function") {
        throw new Error("Callback is required for postOrderForEach");
      }

      function traverse(node) {
        if (node === null) return;

        traverse(node.left);
        traverse(node.right);
        callback(node);
      }

      traverse(this.root);
    }
  }

  return {
    Node,
    Tree,
    prettyPrint,
  };
})();

export default BinarySearch;
