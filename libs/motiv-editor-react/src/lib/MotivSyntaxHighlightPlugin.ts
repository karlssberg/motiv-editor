import { useEffect, useMemo } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getSelection,
  $isRangeSelection,
  LexicalNode,
  TextNode,
} from 'lexical';
import { $createTokenNode, $isTokenNode, TokenNode } from './nodes/TokenNode';
import { useComputed } from '@preact/signals-react';
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
import { Proposition } from 'motiv-editor-react';

function isNotEmpty(text: string) {
  return !!text;
}

const whitespacePattern = /\s+/;
function isWhitespace(text: string) {
  return !!text.match(whitespacePattern);
}

function* tokenize(text: string): Iterable<string> {
  const parameterPattern = Proposition.parameterPattern;
  const splitText = text.split(parameterPattern).filter(isNotEmpty);
  let insideQuote = false;
  let currentToken;
  for (const textPart of splitText) {
    if (textPart === '"') {
      insideQuote = !insideQuote;
      yield textPart;
      continue;
    }
  }
}

interface MotivSyntaxHighlightPluginProps {
  propositions: Proposition[];
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
  propositions,
}: MotivSyntaxHighlightPluginProps) {
  const [editor] = useLexicalComposerContext();

  const propositionMap = useMemo(
    () =>
      new Map(propositions.map((proposition) => [proposition.id, proposition])),
    [propositions]
  );

  const operators = useComputed(
    () => new Map(Object.entries(operatorLiteralToTokenType))
  );

  const operatorAndParenthesisPattern = useComputed(() => {
    const operatorsPattern = [...operators.value.keys()]
      .map(escapeRegExp)
      .join('|');

    const parenthesesPattern = ['(', ')'].map(escapeRegExp).join('|');

    const patterns = [operatorsPattern, parenthesesPattern].filter(
      (pattern) => !!pattern
    );

    const regExpPattern = `(${patterns.join('|')})`;
    return new RegExp(regExpPattern, 'gu');
  });

  const getTokenType = useComputed(() => (text: string): TokenType | null => {
    const normalizedText = Proposition.normalizeProposition(text);
    const proposition = propositionMap.get(normalizedText);
    if (proposition?.validateExpression(text)[0]) return 'proposition';
    if (operators.value.has(text)) return operators.value.get(text)!;
    if (text === '(') return 'openParenthesis';
    if (text === ')') return 'closeParenthesis';
    return null;
  });

  const isValidTokenNode = useComputed(() => (node: TokenNode): boolean => {
    const text = node.getTextContent();

    const validationCheck = [
      {
        type: 'proposition',
        check: (text: string) => {
          const proposition = propositionMap.get(
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
  });

  useEffect(() => {
    function resolveTextNode(content: string): TextNode {
      const tokenType = getTokenType.value(content);
      if (tokenType) {
        return $createTokenNode(content, tokenType);
      }

      return content.match(/^\s+$/)
        ? $createWhitespaceNode(content)
        : $createUnrecognizedNode(content);
    }

    return mergeRegister(
      editor.registerNodeTransform(
        UnrecognizedNode,
        (unrecognizedNode: UnrecognizedNode) => {
          if (tryMergeUnrecognizedNode(unrecognizedNode)) return;

          const content = unrecognizedNode.getTextContent();
          const splitByOperatorsAndParenthesis = content
            .split(operatorAndParenthesisPattern.value)
            .filter(isNotEmpty);

          const [start = 0, end = 0] = getSelectionStartEnd();
          let currentNodeStart = 0;

          for (const segment of splitByOperatorsAndParenthesis)
            for (const textPart of segment.split(/(^\s+|\s+$)/)) {
              if (textPart === '') continue;
              const currentNodeEnd = currentNodeStart + textPart.length;

              const newNode = resolveTextNode(textPart);

              if (textPart === content && $isUnrecognizedNode(newNode)) return;

              unrecognizedNode.insertBefore(newNode);
              if (shouldNodeHaveSelection(currentNodeEnd)) {
                newNode.select(
                  start - currentNodeStart,
                  end - currentNodeStart
                );
              }

              currentNodeStart += textPart.length;
            }

          unrecognizedNode.remove();

          function shouldNodeHaveSelection(currentNodeEnd: number) {
            return currentNodeStart <= start && end <= currentNodeEnd;
          }
        }
      ),
      editor.registerNodeTransform(
        WhitespaceNode,
        (whitespaceNode: WhitespaceNode) => {
          if (tryMergeWhitespaceNode(whitespaceNode)) return;

          const content = whitespaceNode.getTextContent();
          const splitText = content.split(/(^\s+|\s+$)/).filter(isNotEmpty);
          if (splitText.length === 1 && isWhitespace(content)) return;

          const [start = 0, end = 0] = getSelectionStartEnd();
          let offset = 0;

          for (const textPart of splitText) {
            if (textPart === '') continue;
            offset += textPart.length;

            const newNode = resolveTextNode(textPart);
            if (start <= offset && offset <= end) {
              whitespaceNode.insertBefore(newNode);
              newNode.selectEnd();
            } else {
              whitespaceNode.insertBefore(newNode);
            }
          }
          whitespaceNode.remove();
        }
      )
    );
  }, []);

  useEffect(
    () =>
      editor.registerNodeTransform(TokenNode, (node) => {
        if (isValidTokenNode.value(node)) {
          tryMergeOperatorTokenNodes(node);
          return;
        }
        const content = node.getTextContent();
        const textNode = content.match(/^\s+$/)
          ? $createWhitespaceNode(content)
          : $createUnrecognizedNode(content);

        node.replace(textNode);
      }),
    [propositions]
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
