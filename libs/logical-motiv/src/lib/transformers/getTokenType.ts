import { OperatorTypes, TokenType } from '../parser';
import { Proposition } from '../parser';
import {
  $createTokenNode,
  $createWhitespaceNode,
  $createUnrecognizedNode,
} from '../nodes';
import { TextNode } from 'lexical';
import { Signal } from '../signal';

export const createTokenResolver = (
  propositionLookup: Map<string, Proposition>,
  operators: Map<string, OperatorTypes>
) => {
  function getTokenType(text: string): TokenType | null {
    const normalizedText = Proposition.normalizeProposition(text);
    const proposition = propositionLookup.get(normalizedText);
    if (proposition?.validateExpression(text)[0]) return 'proposition';
    if (operators.has(text)) return operators.get(text)!;
    if (text === '(') return 'openParenthesis';
    if (text === ')') return 'closeParenthesis';
    return null;
  }

  function resolveTextNode(content: string): TextNode {
    const tokenType = getTokenType(content);
    if (tokenType) {
      return $createTokenNode(content, tokenType);
    }

    return content.match(/^\s+$/)
      ? $createWhitespaceNode(content)
      : $createUnrecognizedNode(content);
  }

  return {
    getTokenType,
    resolveTextNode,
  };
};
