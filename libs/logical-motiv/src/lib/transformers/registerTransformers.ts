import { LexicalEditor } from 'lexical';
import { mergeRegister } from '@lexical/utils';
import { registerUnrecognizedNode } from './registerUnrecognizedNode';
import { registerTokenNodeTransformer } from './registerTokenNodeTransformer';
import { Proposition, OperatorTypes } from '../parser';
import { registerWhitespaceNodeTransformer } from './registerWhitespaceNodeTransformer';
import { Signal } from '../signal';

export function registerTransformers(
  editor: LexicalEditor,
  propositionLookup: Map<string, Proposition>
) {
  return mergeRegister(
    registerUnrecognizedNode(editor, propositionLookup),
    registerWhitespaceNodeTransformer(editor, propositionLookup),
    registerTokenNodeTransformer(editor, propositionLookup)
  );
}
