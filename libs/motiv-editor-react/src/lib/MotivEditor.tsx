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
import MotivPlugin from './MotivPlugin';
import '@preact/signals-react/auto';
import { MotivSyntaxHighlightPlugin } from './MotivSyntaxHighlightPlugin';
import { TokenNode } from './nodes/TokenNode';
import { WhitespaceNode } from './nodes/WhitespaceNode';
import {
  $createUnrecognizedNode,
  UnrecognizedNode,
} from './nodes/UnrecognizedNode';
import { MotivSyntaxErrorHighlighterPlugin } from './MotivSyntaxErrorHighlighterPlugin';

export interface ParameterInfo {
  type: PrimitiveTypeNames;
}
export enum PrimitiveTypeNames {
  Unknown = 'unknown',
  Decimal = 'decimal',
  String = 'string',
  DateTime = 'dateTime',
  Integer = 'integer',
}

export class Proposition {
  public id: string;
  public template: string;
  public parameters: Record<string, ParameterInfo>;
  public templateParts: string[];

  constructor(
    id: string,
    template: string,
    parameters: Record<string, ParameterInfo> = {}
  ) {
    this.id = id;
    this.template = template;
    this.parameters = parameters;
    this.templateParts = this.splitTemplate(template);
  }

  validate(candidate: string): [boolean, string[]] {
    const candidateParts = this.splitTemplate(candidate);
    const errors: string[] = [];
    let processedCandidate = '';

    for (let i = 0; i < this.templateParts.length; i++) {
      const templatePart = this.templateParts[i];
      const candidatePart = candidateParts[i];
      if (!candidatePart) {
        errors.push(
          `Superfluous text "${candidatePart}" to the proposition "${this.template}"`
        );
      }

      if (isParameter(templatePart)) {
        const parameterName = extractParameterName(templatePart);
        const parameterValue = extractParameterName(candidatePart);
        const expectedParameterType = this.parameters[parameterName].type;
        if (!validateParameter(parameterValue, expectedParameterType)) {
          errors.push(
            `Expected parameter "${parameterName}" to be of type "${expectedParameterType}", but got "${parameterValue}"`
          );
        }
      } else if (templatePart !== candidatePart) {
        errors.push(`Expected "${templatePart}" but got "${candidatePart}"`);
      }
      processedCandidate += candidatePart;
    }
    return [errors.length === 0, errors];

    function isParameter(part: string): boolean {
      return part.startsWith('{') && part.endsWith('}');
    }

    function extractParameterName(part: string): string {
      return part.substring(1, part.length - 1);
    }
  }

  private splitTemplate(template: string): string[] {
    return template.split(/([\{[^}+\}])/);
  }
}

interface MotivEditorProps {
  source: string;
  propositions: Proposition[];
}

// Main editor component
export function MotivEditor({ propositions, source }: MotivEditorProps) {
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
        <MotivPlugin
          propositions={propositions}
          containerRef={containerRef}
          defaultPositionRef={defaultPositionRef}
        />
        <MotivSyntaxHighlightPlugin propositions={propositions} />
        <MotivSyntaxErrorHighlighterPlugin propositions={propositions} />
      </div>
    </LexicalComposer>
  );
}

function isInteger(candidate: string): boolean {
  return /^\d+$/.test(candidate);
}

function isDecimal(candidate: string): boolean {
  return /^\d+\.\d+$/.test(candidate);
}

function isDateTime(candidate: string): boolean {
  return new Date(candidate).toString() !== 'Invalid Date';
}

function isQuotedString(candidate: string): boolean {
  return /^"[^"]"$/.test(candidate);
}

function validateParameter(value: string, type?: PrimitiveTypeNames): boolean {
  switch (type) {
    case PrimitiveTypeNames.Decimal:
      return isDecimal(value);
    case PrimitiveTypeNames.String:
      return isQuotedString(value);
    case PrimitiveTypeNames.DateTime:
      return isDateTime(value);
    case PrimitiveTypeNames.Integer:
      return isInteger(value);
    default:
      return false;
  }
}
