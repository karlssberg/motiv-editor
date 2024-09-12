import { LexicalEditor } from 'lexical';
import { mergeRegister } from '@lexical/utils';
import { registerUnrecognizedNode } from './registerUnrecognizedNode';
import { registerTokenNodeTransformer } from './registerTokenNodeTransformer';
import { Proposition, OperatorTypes } from '../parser';
import { registerWhitespaceNodeTransformer } from './registerWhitespaceNodeTransformer';

export function registerTransformers(
  editor: LexicalEditor,
  propositionLookup: Map<string, Proposition>,
  operators: Map<string, OperatorTypes>
) {
  return mergeRegister(
    registerUnrecognizedNode(editor, propositionLookup, operators),
    registerWhitespaceNodeTransformer(editor, propositionLookup, operators),
    registerTokenNodeTransformer(editor, propositionLookup)
  );
}
