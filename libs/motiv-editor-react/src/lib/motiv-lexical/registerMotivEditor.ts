import { Proposition } from 'motiv-editor-react';
import { operatorLiteralToTokenType, OperatorTypes } from './parser';
import { registerMotivCommands, State } from './states';
import { registerErrorDecorator } from './errors';
import { registerTransformers } from './transformers';
import { LexicalEditor } from 'lexical';
import { mergeRegister } from '@lexical/utils';

export function registerMotivEditor(
  editor: LexicalEditor,
  propositions: Proposition[],
  state: State
) {
  const propositionLookup = new Map<string, Proposition>(
    propositions.map((proposition) => [proposition.id, proposition])
  );
  const operators = new Map<string, OperatorTypes>(
    Object.entries(operatorLiteralToTokenType)
  );
  return mergeRegister(
    registerMotivCommands(editor, state),
    registerErrorDecorator(editor, propositions),
    registerTransformers(editor, propositionLookup, operators)
  );
}
