import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { operatorLiteralToTokenType, OperatorTypes } from './TokenType';
import { Proposition } from './Proposition';
import { registerTransformers } from './motiv-lexical/transformers';

interface MotivSyntaxHighlightPluginProps {
  propositions: Proposition[];
}

export function MotivSyntaxHighlightPlugin({
  propositions,
}: MotivSyntaxHighlightPluginProps) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const propositionLookup = new Map<string, Proposition>(
      propositions.map((proposition) => [proposition.id, proposition])
    );
    const operators = new Map<string, OperatorTypes>(
      Object.entries(operatorLiteralToTokenType)
    );

    return registerTransformers(editor, propositionLookup, operators);
  }, [propositions]);

  return null;
}
