import {
  $getSelection,
  $isRangeSelection,
  LexicalEditor,
  LexicalNode,
} from 'lexical';
import {
  $isUnrecognizedNode,
  UnrecognizedNode,
} from '../nodes/UnrecognizedNode';
import { createTokenResolver } from './getTokenType';
import { Proposition } from '../../Proposition';
import { OperatorTypes } from '../../TokenType';
import { escapeRegExp } from '../../escapeRegExp';
import { getSelectionStartEnd } from './getSelectionStartEnd';

export function registerUnrecognizedNode(
  editor: LexicalEditor,
  propositionLookup: Map<string, Proposition>,
  operators: Map<string, OperatorTypes>
) {
  const { resolveTextNode } = createTokenResolver(propositionLookup, operators);

  const operatorsPattern = [...operators.keys()].map(escapeRegExp).join('|');

  const parenthesesPattern = ['(', ')'].map(escapeRegExp).join('|');

  const patterns = [operatorsPattern, parenthesesPattern].filter(
    (pattern) => !!pattern
  );

  const regExpPattern = `(${patterns.join('|')})`;
  const operatorAndParenthesisPattern = new RegExp(regExpPattern, 'gu');

  return editor.registerNodeTransform(
    UnrecognizedNode,
    (unrecognizedNode: UnrecognizedNode) => {
      if (tryMergeUnrecognizedNode(unrecognizedNode)) return;

      const content = unrecognizedNode.getTextContent();
      const splitByOperatorsAndParenthesis = content
        .split(operatorAndParenthesisPattern)
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
            newNode.select(start - currentNodeStart, end - currentNodeStart);
          }

          currentNodeStart += textPart.length;
        }

      unrecognizedNode.remove();

      function shouldNodeHaveSelection(currentNodeEnd: number) {
        return currentNodeStart <= start && end <= currentNodeEnd;
      }
    }
  );
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

function isNotEmpty(text: string) {
  return !!text;
}
