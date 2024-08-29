class RedBlackNode<T> {
  constructor(
    public value: T,
    public color: 'RED' | 'BLACK' = 'RED',
    public left: RedBlackNode<T> | null = null,
    public right: RedBlackNode<T> | null = null,
    public parent: RedBlackNode<T> | null = null
  ) {}
}

type Comparer<T> = (left: T, right: T) => number;

export type Comparable = string | number | Date;
export class RedBlackTree<T, TComparable extends Comparable> {
  root: RedBlackNode<T> | null = null;
  private readonly comparer: Comparer<T>;

  constructor(comparer: Comparer<T>) {
    this.comparer = comparer;
  }

  *get(evaluator: (Value: T) => number): Iterable<T> {
    const stack = [];
    let current: RedBlackNode<T> | null = this.root;
    while (current !== null) {
      const comparison = evaluator(current.value);
      if (comparison < 0) {
        current.right && stack.push(current.right);
      } else if (comparison > 0) {
        current.left && stack.push(current.left);
      } else {
        yield current.value;
        current.right && stack.push(current.right);
        current.left && stack.push(current.left);
      }
      current = stack.pop() ?? null;
    }
  }

  insert(value: T): void {
    const newNode = new RedBlackNode(value);
    if (this.root === null) {
      this.root = newNode;
      this.root.color = 'BLACK';
      return;
    }

    let current: RedBlackNode<T> | null = this.root;
    let parent: RedBlackNode<T> | null = null;
    while (current !== null) {
      parent = current;
      if (this.comparer(value, current.value) < 0) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    newNode.parent = parent;
    if (this.comparer(value, parent!.value) < 0) {
      parent!.left = newNode;
    } else {
      parent!.right = newNode;
    }

    this.fixUpAfterInsertion(newNode);
  }

  private fixUpAfterInsertion(node: RedBlackNode<T>): void {
    while (node.parent !== null && node.parent.color === 'RED') {
      if (node.parent === node.parent.parent?.left) {
        const uncle = node.parent.parent.right;
        if (uncle && uncle.color === 'RED') {
          // Case 1: Uncle is red
          node.parent.color = 'BLACK';
          uncle.color = 'BLACK';
          node.parent.parent.color = 'RED';
          node = node.parent.parent;
        } else {
          if (node === node.parent.right) {
            // Case 2: Uncle is black and node is a right child
            node = node.parent;
            this.rotateLeft(node);
          }
          // Case 3: Uncle is black and node is a left child
          node.parent!.color = 'BLACK';
          node.parent!.parent!.color = 'RED';
          this.rotateRight(node.parent!.parent!);
        }
      } else {
        // Mirror image of the above cases
        const uncle = node.parent.parent?.left;
        if (uncle && uncle.color === 'RED') {
          node.parent.color = 'BLACK';
          uncle.color = 'BLACK';
          node.parent.parent!.color = 'RED';
          node = node.parent.parent!;
        } else {
          if (node === node.parent.left) {
            node = node.parent;
            this.rotateRight(node);
          }
          node.parent!.color = 'BLACK';
          node.parent!.parent!.color = 'RED';
          this.rotateLeft(node.parent!.parent!);
        }
      }
    }
    this.root!.color = 'BLACK';
  }

  rotateLeft(node: RedBlackNode<T>): void {
    const right = node.right!;
    node.right = right.left;
    if (right.left !== null) {
      right.left.parent = node;
    }
    right.parent = node.parent;
    if (node.parent === null) {
      this.root = right;
    } else if (node === node.parent.left) {
      node.parent.left = right;
    } else {
      node.parent.right = right;
    }
    right.left = node;
    node.parent = right;
  }

  rotateRight(node: RedBlackNode<T>): void {
    const left = node.left!;
    node.left = left.right;
    if (left.right !== null) {
      left.right.parent = node;
    }
    left.parent = node.parent;
    if (node.parent === null) {
      this.root = left;
    } else if (node === node.parent.right) {
      node.parent.right = left;
    } else {
      node.parent.left = left;
    }
    left.right = node;
    node.parent = left;
  }
}
