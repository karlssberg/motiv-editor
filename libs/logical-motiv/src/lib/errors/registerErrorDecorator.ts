import { Token } from 'antlr4ng';
import { $isTokenNode, $isUnrecognizedNode, $isWhitespaceNode } from '../nodes';
import { createMotivParser, ErrorInfo, Proposition } from '../parser';
import { $getRoot, LexicalEditor, TextNode } from 'lexical';
import { RedBlackTree } from './RedBlackTree';
import { Signal } from '../signal';

export function registerErrorDecorator(
  editor: LexicalEditor,
  propositions: Map<string, Proposition>
): () => void {
  const parser = createMotivParser(propositions);

  return editor.registerTextContentListener(() => {
    editor.update(() => {
      resetValidation();
      const text = $getRoot().getTextContent();
      const lines = calculateAccumulativeLineLengths(text);
      const children = Array.from(getChildrenMetadata());
      const findNodes = createNodeFinder(children);

      const { success, errors } = parser(text);
      if (success) return;

      const errorInfos = getErrorInfos(errors, lines);

      for (const errorInfo of errorInfos) {
        if (errorInfo.isEOF) {
          const lastChild = children[children.length - 1]?.node;
          if ($isTokenNode(lastChild) || $isWhitespaceNode(lastChild)) {
            lastChild.setInvalid(errorInfo.message ?? 'invalid syntax');
            break;
          }
        }
        const nodeInfos = findNodes(errorInfo);
        for (const nodeInfo of nodeInfos) {
          const node = nodeInfo.node;
          if ($isUnrecognizedNode(node) || $isTokenNode(node)) {
            node.setInvalid(errorInfo.message ?? 'invalid syntax');
          }
        }
      }
    });
  });
}

interface NodeMetadata {
  node: TextNode;
  start: number;
  end: number;
}

interface ExtendedErrorInfo {
  start: number;
  end: number;
  isEOF: boolean;
  line: number;
  column: number;
  token: Token | null;
  message: string | undefined;
}

function calculateAccumulativeLineLengths(text: string) {
  return text.split('\n').reduce<number[]>(
    (arr, line) => {
      const previousTotal = arr[arr.length - 1] ?? 0;
      const total = previousTotal + line.length + 1;
      arr.push(total);
      return arr;
    },
    [0]
  );
}

function resetValidation() {
  const root = $getRoot();
  root
    .getAllTextNodes()
    .filter((node) => $isUnrecognizedNode(node) || $isTokenNode(node))
    .forEach((node) => {
      node.setValid();
    });
}

function getErrorInfos(errors: ErrorInfo[], lines: number[]) {
  return errors.map<ExtendedErrorInfo>((error) => {
    const textLength = error.token?.text?.length ?? 0;
    const offset = lines[error.line - 1];

    const start = offset + error.column;
    const end = start + textLength;
    return {
      ...error,
      start,
      end,
      isEOF: error.token?.type === Token.EOF,
    };
  });
}

function* getChildrenMetadata(): Iterable<NodeMetadata> {
  const root = $getRoot();
  const children = root.getAllTextNodes();
  let offset = 0;
  for (const child of children) {
    const text = child.getTextContent();
    yield {
      node: child,
      start: offset,
      end: offset + text.length,
    };
    offset += text.length;
  }
}

function createNodeFinder(
  children: NodeMetadata[]
): (errorInfo: ExtendedErrorInfo) => NodeMetadata[] {
  const nodeLookup = children.reduce((tree, child) => {
    tree.insert(child);
    return tree;
  }, new RedBlackTree<NodeMetadata, number>((node) => node.start));

  return function getNodes(errorInfo: ExtendedErrorInfo): NodeMetadata[] {
    const nodeMetadataIterable = nodeLookup.get((node) => {
      const overlaps =
        node.start <= errorInfo.end && node.end >= errorInfo.start;
      if (overlaps) return 0;

      return node.start - errorInfo.start;
    });

    return Array.from(nodeMetadataIterable);
  };
}
