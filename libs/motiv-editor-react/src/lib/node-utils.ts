import { $getRoot, ElementNode, Klass, LexicalNode } from 'lexical';

export function $getNonElementNodes(): LexicalNode[] {
  const root = $getRoot();
  const nodes: LexicalNode[] = [];

  function traverse(node: LexicalNode) {
    if (node instanceof ElementNode) {
      node.getChildren().forEach(traverse);
      return;
    }

    nodes.push(node);
  }

  traverse(root);
  return nodes;
}

export function $getNodesOfType<T extends LexicalNode>(klass: Klass<T>) {
  const root = $getRoot();
  const nodes: T[] = [];

  function traverse(node: LexicalNode) {
    if (node instanceof klass) {
      nodes.push(node as T);
    }
    if (node instanceof ElementNode) {
      node.getChildren().forEach(traverse);
      return;
    }
  }

  traverse(root);
  return nodes;
}
