import React, { useCallback, useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $createTextNode,
  $getSelection,
  $isRangeSelection,
  $setSelection,
  LexicalNode,
  RangeSelection,
  TextNode,
} from 'lexical';
import { $createTokenNode, $isTokenNode, TokenNode } from './nodes/TokenNode';
import { computed, Signal, useComputed } from '@preact/signals-react';
import type { Suggestion } from './Suggestion';
import { operatorLiteralToTokenType, TokenType } from './TokenType';
import {
  $createWhitespaceNode,
  $isWhitespaceNode,
  WhitespaceNode,
} from './nodes/WhitespaceNode';
import { mergeRegister } from '@lexical/utils';
import {
  $createUnrecognizedNode,
  $isUnrecognizedNode,
  UnrecognizedNode,
} from './nodes/UnrecognizedNode';

function isWhitespace(text: string) {
  return !text.match(/\S/);
}
interface MotivSyntaxHighlightPluginProps {
  specs: Signal<Suggestion[]>;
}

function tryMergeUnrecognizedNode(unrecognizedNode: UnrecognizedNode) {
  const previousNode = unrecognizedNode.getPreviousSibling();
  if ($isUnrecognizedNode(previousNode)) {
    const previousText = previousNode.getTextContent();
    const currentText = unrecognizedNode.getTextContent();
    const mergedText = previousText + currentText;
    unrecognizedNode.setTextContent(mergedText);
    const selection = $getSelection();

    if (!$isRangeSelection(selection)) {
      previousNode.remove();
      return true;
    }

    const isSelected = (node: LexicalNode) =>
      selection.anchor.getNode() === node || selection.focus.getNode() === node;

    if (isSelected(unrecognizedNode)) {
      unrecognizedNode.select(
        previousText.length + selection.anchor.offset,
        previousText.length + selection.focus.offset
      );
    } else if (isSelected(previousNode)) {
      unrecognizedNode.select(selection.anchor.offset, selection.focus.offset);
    }
    previousNode.remove();

    return true;
  }
  return false;
}

function tryMergeWhitespaceNode(whitespaceNode: WhitespaceNode) {
  const previousNode = whitespaceNode.getPreviousSibling();
  if ($isWhitespaceNode(previousNode)) {
    const previousText = previousNode.getTextContent();
    const currentText = whitespaceNode.getTextContent();
    const mergedText = previousText + currentText;
    whitespaceNode.setTextContent(mergedText);
    whitespaceNode.select(previousText.length, previousText.length);
    previousNode.remove();

    return true;
  }
  return false;
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
function escapeRegExp(txt: string) {
  return txt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function MotivSyntaxHighlightPlugin({
  specs,
}: MotivSyntaxHighlightPluginProps) {
  const [editor] = useLexicalComposerContext();

  const propositions = useComputed(
    () => new Set(specs.value.map((spec) => spec.value))
  );
  const operators = useComputed(
    () => new Map(Object.entries(operatorLiteralToTokenType))
  );

  const pattern = useComputed(() => {
    const atomsPattern = specs.value
      .map((suggestion) => suggestion.value)
      .map(escapeRegExp)
      .join('|');
    const operatorsPattern = [...operators.value.keys()]
      .map(escapeRegExp)
      .join('|');
    const parenthesesPattern = ['\\(', '\\)'].join('|');
    const regExpPattern = `(${atomsPattern}|${operatorsPattern}|${parenthesesPattern})`;
    return new RegExp(regExpPattern, 'g');
  });

  const getTokenType = useComputed(() => (text: string): TokenType | null => {
    if (propositions.value.has(text)) return 'atom';
    if (operators.value.has(text)) return operators.value.get(text)!;
    if (text === '(') return 'openParenthesis';
    if (text === ')') return 'closeParenthesis';
    return null;
  });

  const isValidTokenNode = useComputed(() => (node: TokenNode): boolean => {
    const text = node.getTextContent();

    const validationCheck = [
      { type: 'atom', check: (text: string) => propositions.value.has(text) },
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
  });

  useEffect(
    () =>
      mergeRegister(
        editor.registerNodeTransform(
          UnrecognizedNode,
          (unrecognizedNode: UnrecognizedNode) => {
            if (tryMergeUnrecognizedNode(unrecognizedNode)) return;

            const content = unrecognizedNode.getTextContent();
            const splitText = content.split(pattern.value);
            if (splitText.length === 1) {
              if (isWhitespace(content))
                unrecognizedNode.replace($createWhitespaceNode(content));

              return;
            }

            const [start = 0, end = 0] = getSelectionStartEnd();
            let currentNodeStart = 0;

            for (const textPart of splitText) {
              if (textPart === '') continue;
              const currentNodeEnd = currentNodeStart + textPart.length;

              const tokenType = getTokenType.value(textPart);

              const newNode = resolveLexicalNode(textPart, tokenType);
              unrecognizedNode.insertBefore(newNode);
              if (currentNodeStart <= start && end <= currentNodeEnd) {
                newNode.select(
                  start - currentNodeStart,
                  end - currentNodeStart
                );
              }

              currentNodeStart += textPart.length;
            }

            unrecognizedNode.remove();

            function resolveLexicalNode(
              content: string,
              tokenType?: TokenType | null
            ): TextNode {
              if (tokenType) {
                return $createTokenNode(content, tokenType);
              }

              return !content.match(/\S/)
                ? $createWhitespaceNode(content)
                : $createUnrecognizedNode(content);
            }
          }
        ),
        editor.registerNodeTransform(
          WhitespaceNode,
          (whitespaceNode: WhitespaceNode) => {
            if (tryMergeWhitespaceNode(whitespaceNode)) return;

            const content = whitespaceNode.getTextContent();
            const splitText = content.split(pattern.value);
            if (splitText.length === 1) {
              if (isWhitespace(content)) return;
              whitespaceNode.replace($createUnrecognizedNode(content));
              return;
            }

            const [start = 0, end = 0] = getSelectionStartEnd();
            let offset = 0;

            for (const textPart of splitText) {
              if (textPart === '') continue;
              offset += textPart.length;

              const tokenType = getTokenType.value(textPart);
              if (!tokenType && !isWhitespace(textPart)) return;

              const newNode = resolveLexicalNode(textPart, tokenType);
              if (start <= offset && offset <= end) {
                whitespaceNode.insertBefore(newNode);
                newNode.selectEnd();
              } else {
                whitespaceNode.insertBefore(newNode);
              }
            }
            whitespaceNode.remove();

            function resolveLexicalNode(
              content: string,
              tokenType?: TokenType | null
            ): LexicalNode {
              if (tokenType) {
                return $createTokenNode(content, tokenType);
              }

              return !content.match(/\S/)
                ? $createWhitespaceNode(content)
                : $createUnrecognizedNode(content);
            }
          }
        )
      ),
    []
  );

  useEffect(
    () =>
      editor.registerNodeTransform(TokenNode, (node) => {
        if (isValidTokenNode.value(node)) {
          tryMergeOperatorTokenNodes(node);
          return;
        }
        const content = node.getTextContent();
        const textNode = content.match(/\s/)
          ? $createWhitespaceNode(content)
          : $createUnrecognizedNode(content);

        node.replace(textNode);
      }),
    [propositions.value]
  );

  return null;
}

function getSelectionStartEnd(): [number | undefined, number | undefined] {
  let start;
  let end;
  const selection = $getSelection();
  if ($isRangeSelection(selection)) {
    const points = selection.getStartEndPoints();
    if (points) {
      const [startPoint, endPoint] = points;
      start = startPoint.offset;
      end = endPoint.offset;
    }
  }
  return [start, end];
}
