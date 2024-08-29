import React, { useCallback, useMemo, useRef } from 'react';
import {
  InitialConfigType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { EditorState, LexicalEditor, TextNode } from 'lexical';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import MotivPlugin from './MotivPlugin';
import { Suggestion } from './Suggestion';
import { computed, useComputed, useSignal } from '@preact/signals-react';
import '@preact/signals-react/auto';
import { MotivSyntaxHighlightPlugin } from './MotivSyntaxHighlightPlugin';
import { TokenNode } from './nodes/TokenNode';
import { WhitespaceNode } from './nodes/WhitespaceNode';
import {
  $createUnrecognizedNode,
  UnrecognizedNode,
} from './nodes/UnrecognizedNode';
import { MotivSyntaxErrorHighlighterPlugin } from './MotivSyntaxErrorHighlighterPlugin';

const defaultItems: Suggestion[] = [
  {
    label: 'competitor price match',
    value: 'competitor-price-match',
    type: 'atom',
  },
  {
    label: 'in stock for 90 days',
    value: 'in-stock-for-90-days',
    type: 'atom',
  },
  { label: 'night owl', value: 'night-owl', type: 'atom' },
  {
    label: 'previously abandoned product',
    value: 'previously-abandoned-product',
    type: 'atom',
  },
];

// Main editor component
export function MotivEditor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const atomSuggestions = useSignal(defaultItems);
  const atoms = useComputed(() => atomSuggestions.value.map((s) => s.value));
  const initialConfig = useMemo<InitialConfigType>(
    () => ({
      namespace: 'RuleEngineEditor',
      onError: (error: Error, editor: LexicalEditor): void => {
        console.error(error);
      },
      theme: {},
      nodes: [
        TokenNode,
        WhitespaceNode,
        UnrecognizedNode,
        {
          replace: TextNode,
          with: (node: TextNode) => {
            return $createUnrecognizedNode(node.getTextContent());
          },
        },
      ],
    }),
    []
  );

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="relative" ref={containerRef} spellCheck="false">
        <PlainTextPlugin
          contentEditable={
            <ContentEditable className="min-w-96 p-4 rounded-md" />
          }
          placeholder={
            <div className="absolute left-4 top-4 pointer-events-none">
              Enter your rule...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <MotivPlugin specs={atomSuggestions} containerRef={containerRef} />
        <MotivSyntaxHighlightPlugin specs={atomSuggestions} />
        <MotivSyntaxErrorHighlighterPlugin atoms={atoms} />
      </div>
    </LexicalComposer>
  );
}
