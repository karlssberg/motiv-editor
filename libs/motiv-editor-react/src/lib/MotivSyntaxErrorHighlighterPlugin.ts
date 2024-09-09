import { useEffect, useMemo } from 'react';
import { $getRoot, TextNode } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { RedBlackTree } from './RedBlackTree';
import { $isUnrecognizedNode } from './nodes/UnrecognizedNode';
import { $isTokenNode } from './nodes/TokenNode';
import { createMotivParser, ErrorInfo } from './motivParser';
import { Token } from 'antlr4ng';
import { $isWhitespaceNode } from './nodes/WhitespaceNode';
import { Proposition } from 'motiv-editor-react';

interface NodeMetadata {
  node: TextNode;
  start: number;
  end: number;
}

interface MotivSyntaxErrorHighlighterPluginProps {
  propositions: Proposition[];
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

export function MotivSyntaxErrorHighlighterPlugin({
  propositions,
}: MotivSyntaxErrorHighlighterPluginProps) {
  const [editor] = useLexicalComposerContext();
  const parser = useMemo(() => createMotivParser(propositions), [propositions]);
  useEffect(
    () =>
      editor.registerTextContentListener(() => {
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
      }),
    [editor]
  );

  return null;
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
