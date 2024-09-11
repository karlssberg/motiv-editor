import { $createTokenNode, $isTokenNode, TokenNode } from '../nodes/TokenNode';
import { $createWhitespaceNode } from '../nodes/WhitespaceNode';
import { $createUnrecognizedNode } from '../nodes/UnrecognizedNode';
import { Proposition } from '../../Proposition';
import { LexicalEditor, LexicalNode } from 'lexical';

export function registerTokenNodeTransformer(
  editor: LexicalEditor,
  propositionLookup: Map<string, Proposition>
): () => void {
  return editor.registerNodeTransform(TokenNode, (node) => {
    if (isValidTokenNode(node, propositionLookup)) {
      tryMergeOperatorTokenNodes(node);
      return;
    }
    const content = node.getTextContent();
    const textNode = content.match(/^\s+$/)
      ? $createWhitespaceNode(content)
      : $createUnrecognizedNode(content);

    node.replace(textNode);
  });
}

function tryMergeOperatorTokenNodes(node: TokenNode) {
  const prevNode = node.getPreviousSibling();
  if (!prevNode) return;

  if (isOperatorMatch('and', prevNode)) {
    prevNode.replace($createTokenNode('&&', 'andalso'));
    node.remove();
  }
  if (isOperatorMatch('or', prevNode)) {
    prevNode.replace($createTokenNode('||', 'orelse'));
    node.remove();
  }
  return;

  function isOperatorMatch(
    op: 'and' | 'or',
    prevNode: LexicalNode | null
  ): boolean {
    if (!prevNode) return false;

    const tokenType = node.getTokenType();

    return (
      prevNode &&
      $isTokenNode(prevNode) &&
      prevNode.getTokenType() === tokenType &&
      tokenType === op
    );
  }
}

function isValidTokenNode(
  node: TokenNode,
  propositionLookup: Map<string, Proposition>
): boolean {
  const text = node.getTextContent();

  const validationCheck = [
    {
      type: 'proposition',
      check: (text: string) => {
        const proposition = propositionLookup.get(
          Proposition.normalizeProposition(text)
        );
        return proposition ? proposition.validateExpression(text)[0] : false;
      },
    },
    { type: 'and', check: (text: string) => text === '&' },
    { type: 'andalso', check: (text: string) => text === '&&' },
    { type: 'or', check: (text: string) => text === '|' },
    { type: 'orelse', check: (text: string) => text === '||' },
    { type: 'not', check: (text: string) => text === '!' },
    { type: 'xor', check: (text: string) => text === '^' },
    { type: 'openParenthesis', check: (text: string) => text === '(' },
    { type: 'closeParenthesis', check: (text: string) => text === ')' },
  ];

  return validationCheck.some(
    ({ type, check }) => node.getTokenType() === type && check(text)
  );
}
