import { useEffect, useMemo } from 'react';
import { $getRoot, TextNode } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { RedBlackTree } from './RedBlackTree';
import { $isUnrecognizedNode } from './nodes/UnrecognizedNode';
import { $isTokenNode } from './nodes/TokenNode';
import { Signal, useComputed } from '@preact/signals-react';
import { createMotivParser } from './motivParser';
import { Token } from 'antlr4ng';
import { $isWhitespaceNode } from './nodes/WhitespaceNode';

interface NodeMetadata {
  node: TextNode;
  start: number;
  end: number;
}

interface MotivSyntaxErrorHighlighterPluginProps {
  atoms: Signal<string[]>;
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

export function MotivSyntaxErrorHighlighterPlugin({
  atoms,
}: MotivSyntaxErrorHighlighterPluginProps) {
  const [editor] = useLexicalComposerContext();
  const parser = useComputed(() => createMotivParser(atoms.value));
  useEffect(
    () =>
      editor.registerTextContentListener(() => {
        editor.update(() => {
          const root = $getRoot();
          root
            .getAllTextNodes()
            .filter((node) => $isUnrecognizedNode(node) || $isTokenNode(node))
            .forEach((node) => {
              node.setValid();
            });

          const text = root.getTextContent();
          const lines = text.split('\n').reduce<number[]>(
            (arr, line) => {
              const previousTotal = arr[arr.length - 1] ?? 0;
              const total = previousTotal + line.length + 1;
              arr.push(total);
              return arr;
            },
            [0]
          );
          const children = Array.from(getChildrenMetadata());

          const nodeLookup = children.reduce((tree, child) => {
            tree.insert(child);
            return tree;
          }, new RedBlackTree<NodeMetadata, number>((node) => node.start));

          const { success, errors } = parser.value(text);
          if (success) return;

          const errorInfos = errors.map<ExtendedErrorInfo>((error) => {
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

          for (const errorInfo of errorInfos) {
            if (errorInfo.isEOF) {
              const lastChild = children[children.length - 1]?.node;
              if ($isTokenNode(lastChild) || $isWhitespaceNode(lastChild)) {
                lastChild.setInvalid(errorInfo.message ?? 'invalid syntax');
                break;
              }
            }
            const nodeInfos = getNodes(errorInfo);
            for (const nodeInfo of nodeInfos) {
              const node = nodeInfo.node;
              if ($isUnrecognizedNode(node) || $isTokenNode(node)) {
                node.setInvalid(errorInfo.message ?? 'invalid syntax');
              }
            }
          }

          function getNodes(errorInfo: ExtendedErrorInfo): NodeMetadata[] {
            const nodeMetadataIterable = nodeLookup.get((node) => {
              const overlaps =
                node.start <= errorInfo.end && node.end >= errorInfo.start;
              if (overlaps) return 0;

              return node.start - errorInfo.start;
            });

            return Array.from(nodeMetadataIterable);
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
