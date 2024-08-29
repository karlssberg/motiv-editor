﻿import { PropositionalLogicParser } from './antlr/PropositionalLogicParser';
import { Suggestion } from './Suggestion';
import {
  CharStream,
  CommonTokenStream,
  DefaultErrorStrategy,
  ParseTree,
  TerminalNode,
} from 'antlr4ng';
import { PropositionalLogicLexer } from './antlr/PropositionalLogicLexer';
import { CandidatesCollection, CodeCompletionCore } from 'antlr4-c3';

const xOrSuggestions: Suggestion[] = [
  {
    label: '^',
    value: '^',
    type: 'operator',
  },
];
const orSuggestions: Suggestion[] = [
  {
    label: '&',
    value: '|',
    type: 'operator',
  },
  {
    label: '||',
    value: '||',
    type: 'operator',
  },
];
const andSuggestions: Suggestion[] = [
  {
    label: '&',
    value: '&',
    type: 'operator',
  },
  {
    label: '&&',
    value: '&&',
    type: 'operator',
  },
];
const notSuggestions: Suggestion[] = [
  {
    label: '!',
    value: '!',
    type: 'operator',
  },
];

const countCharacter =
  (char: string) =>
  (str: string): number =>
    [...str].reduce(
      (count, stringChar) => count + (stringChar === char ? 1 : 0),
      0
    );

const parenthesisSuggestions: Suggestion[] = [
  {
    label: '(',
    value: '(',
    type: 'parenthesis',
  },
  {
    label: ')',
    value: ')',
    type: 'parenthesis',
  },
];

export default class AutoSuggester {
  private readonly defaultSuggestions: Suggestion[];
  constructor(private readonly atomSuggestions: Suggestion[]) {
    this.defaultSuggestions = [
      ...atomSuggestions,
      ...andSuggestions,
      ...orSuggestions,
      ...xOrSuggestions,
      ...notSuggestions,
      ...parenthesisSuggestions,
    ];
  }

  getSuggestions(
    input: string,
    caretPosition: number,
    searchCriteria: string
  ): Suggestion[] {
    const parserSuggestions = this.getSuggestionsFromParser(
      input,
      caretPosition
    );
    const suggestions =
      parserSuggestions.length > 0
        ? parserSuggestions
        : this.defaultSuggestions;

    if (searchCriteria === '') return suggestions;

    return suggestions.reduce<Suggestion[]>(
      (list: Suggestion[], suggestion: Suggestion) => {
        if (suggestion.value.includes(searchCriteria)) {
          list.unshift(suggestion);
        } else {
          list.push(suggestion);
        }
        return list;
      },
      []
    );
  }

  private getSuggestionsFromParser(input: string, caretPosition: number) {
    const charStream = CharStream.fromString(input);
    const lexer = new PropositionalLogicLexer(charStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new PropositionalLogicParser(tokenStream);

    lexer.removeErrorListeners();

    parser.errorHandler = new DefaultErrorStrategy();

    const formulaContext = parser.formula();

    const position = {
      line: countCharacter('\n')(input.slice(0, caretPosition)),
      column: caretPosition - input.lastIndexOf('\n', caretPosition) - 1,
    };

    const index = computeTokenIndex(formulaContext, position);
    const core = new CodeCompletionCore(parser);
    core.ignoredTokens = new Set([PropositionalLogicParser.WS]);
    core.preferredRules = new Set([PropositionalLogicParser.RULE_atom]);

    const candidates = core.collectCandidates(
      index ?? lexer.emitEOF().tokenIndex
    );

    const suggestions: Suggestion[] = [
      ...this.getTokenBasedSuggestions(candidates, parser),
      ...this.getRuleBasedSuggestions(candidates),
    ];
    return suggestions;
  }

  private *getRuleBasedSuggestions(
    candidates: CandidatesCollection
  ): Iterable<Suggestion> {
    for (const tuple of candidates.rules) {
      const [index] = tuple;
      if (index === PropositionalLogicParser.RULE_atom) {
        yield* this.atomSuggestions;
      } else {
        yield* andSuggestions;
        yield* orSuggestions;
        yield* xOrSuggestions;
        yield* notSuggestions;
      }
    }
  }

  private *getTokenBasedSuggestions(
    candidates: CandidatesCollection,
    parser: PropositionalLogicParser
  ): Iterable<Suggestion> {
    for (const tuple of candidates.tokens) {
      const [index] = tuple;
      const vocabulary = parser.vocabulary;
      const name = vocabulary
        .getLiteralName(index)
        ?.toLowerCase()
        .replace(/'/g, '');
      if (!name) return [];

      yield {
        label: name,
        value: name,
        type: 'operator',
      };
    }
  }
}

export type CaretPosition = { line: number; column: number };
export function computeTokenIndex(
  parseTree: ParseTree,
  caretPosition: CaretPosition
): number | undefined {
  if (parseTree instanceof TerminalNode) {
    return computeTokenIndexOfTerminalNode(parseTree, caretPosition);
  } else {
    return computeTokenIndexOfChildNode(parseTree, caretPosition);
  }
}

function computeTokenIndexOfTerminalNode(
  parseTree: TerminalNode,
  caretPosition: CaretPosition
) {
  let start = parseTree.symbol.column;
  let stop = parseTree.symbol.column + parseTree.getText().length;
  if (
    parseTree.symbol.line - 1 == caretPosition.line &&
    start <= caretPosition.column &&
    stop >= caretPosition.column
  ) {
    return parseTree.symbol.tokenIndex;
  } else {
    return undefined;
  }
}

function computeTokenIndexOfChildNode(
  parseTree: ParseTree,
  caretPosition: CaretPosition
) {
  for (let i = 0; i < parseTree.getChildCount(); i++) {
    const child = parseTree.getChild(i)!;
    const index = computeTokenIndex(child, caretPosition);
    if (index !== undefined) {
      return index;
    }
  }
  return undefined;
}
