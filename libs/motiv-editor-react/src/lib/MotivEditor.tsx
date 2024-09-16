import React, { useMemo, useRef } from 'react';
import {
  InitialConfigType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  LexicalEditor,
  TextNode,
} from 'lexical';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import '@preact/signals-react/auto';
import {
  TokenNode,
  WhitespaceNode,
  $createUnrecognizedNode,
  UnrecognizedNode,
  Proposition,
} from 'logical-motiv';

interface MotivEditorProps {
  source: string;
  propositions: Proposition[];
  onChange?: (source: string) => void;
}

// Main editor component
export function MotivEditor({
  propositions,
  source,
  onChange,
}: MotivEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const defaultPositionRef = useRef<HTMLSpanElement>(null);
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
      editorState: (editor: LexicalEditor): void => {
        const paragraph = $createParagraphNode();
        const text = $createTextNode(source);
        paragraph.append(text);
        $getRoot().append(paragraph);
        $getRoot().selectEnd();
      },
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
              <span ref={defaultPositionRef}></span>Enter your rule...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        {/*<MotivPlugin*/}
        {/*  propositions={propositions}*/}
        {/*  containerRef={containerRef}*/}
        {/*  defaultPositionRef={defaultPositionRef}*/}
        {/*  onChange={onChange}*/}
        {/*  source={source}*/}
        {/*/>*/}
      </div>
    </LexicalComposer>
  );
}
