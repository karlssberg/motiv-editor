import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Proposition } from './Proposition';
import { registerErrorDecorator } from './motiv-lexical/errors/registerErrorDecorator';

interface MotivSyntaxErrorHighlighterPluginProps {
  propositions: Proposition[];
}

export function MotivSyntaxErrorHighlighterPlugin({
  propositions,
}: MotivSyntaxErrorHighlighterPluginProps) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => registerErrorDecorator(editor, propositions), [editor]);

  return null;
}
