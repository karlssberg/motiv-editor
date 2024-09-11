import { LexicalEditor } from 'lexical';
import { $isWhitespaceNode, WhitespaceNode } from '../nodes/WhitespaceNode';
import { createTokenResolver } from './getTokenType';
import { Proposition } from '../../Proposition';
import { OperatorTypes } from '../../TokenType';
import { getSelectionStartEnd } from './getSelectionStartEnd';

export function registerWhitespaceNodeTransformer(
  editor: LexicalEditor,
  propositionLookup: Map<string, Proposition>,
  operators: Map<string, OperatorTypes>
): () => void {
  const { resolveTextNode } = createTokenResolver(propositionLookup, operators);

  return editor.registerNodeTransform(
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
  );
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

function isNotEmpty(text: string) {
  return !!text;
}

const whitespacePattern = /\s+/;
function isWhitespace(text: string) {
  return !!text.match(whitespacePattern);
}
