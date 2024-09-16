import { CreateEditorArgs, TextNode } from 'lexical';
import {
  $createUnrecognizedNode,
  TokenNode,
  UnrecognizedNode,
  WhitespaceNode,
} from './nodes';

export const motivConfig: CreateEditorArgs = {
  namespace: 'MotivEditor',
  onError: console.error,
  theme: {},
  nodes: [
    TokenNode,
    WhitespaceNode,
    UnrecognizedNode,
    {
      replace: TextNode,
      with: (node: TextNode) => {
        return $createUnrecognizedNode(node.getTextContent());
      },
    },
  ],
};
