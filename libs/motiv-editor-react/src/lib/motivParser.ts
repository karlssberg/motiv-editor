import { PropositionalLogicListener } from './antlr/PropositionalLogicListener';
import {
  PropositionContext,
  PropositionalLogicParser,
} from './antlr/PropositionalLogicParser';
import {
  ATNSimulator,
  BaseErrorListener,
  CharStream,
  CommonTokenStream,
  RecognitionException,
  Recognizer,
  Token,
} from 'antlr4ng';
import { PropositionalLogicLexer } from './antlr/PropositionalLogicLexer';
import { Proposition } from 'motiv-editor-react';

export interface ErrorInfo {
  line: number;
  column: number;
  token: Token | null;
  message: string | undefined;
}

class MotivSemanticErrorListener extends PropositionalLogicListener {
  private readonly propositions: Set<string>;
  private readonly errors: ErrorInfo[] = [];

  constructor(propositions: string[]) {
    super();
    this.propositions = new Set(propositions);
  }
  exitProposition = (ctx: PropositionContext): void => {
    const proposition = ctx.getText();
    const normalizedProposition = normalizeProposition(proposition);
    if (!this.propositions.has(normalizedProposition)) {
      this.errors.push({
        line: ctx.start!.line,
        column: ctx.start!.column,
        token: ctx.start,
        message: `The name '${proposition}' is not a recognized proposition`,
      });
    }
  };

  getErrors(): ErrorInfo[] {
    return this.errors;
  }
}

class MotivSyntaxErrorListener extends BaseErrorListener {
  private readonly errors: ErrorInfo[] = [];

  syntaxError<S extends Token, T extends ATNSimulator>(
    recognizer: Recognizer<T>,
    offendingSymbol: S | null,
    line: number,
    column: number,
    msg: string,
    e: RecognitionException | null
  ) {
    super.syntaxError(recognizer, offendingSymbol, line, column, msg, e);
    this.errors.push({
      line: line,
      column: column,
      token: offendingSymbol,
      message: msg,
    });
  }

  getErrors(): ErrorInfo[] {
    return this.errors;
  }
}

interface MotivParserResult {
  success: boolean;
  errors: ErrorInfo[];
}

function normalizeProposition(proposition: string): string {
  return proposition.replace(/\{[^}]\}/g, '').toUpperCase();
}

export function createMotivParser(
  propositions: Proposition[]
): (input: string) => MotivParserResult {
  const normalizedPropositions = propositions.map((propositions) =>
    normalizeProposition(propositions.template)
  );

  return (input: string) => {
    const charStream = CharStream.fromString(input);
    const lexer = new PropositionalLogicLexer(charStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new PropositionalLogicParser(tokenStream);

    const syntaxErrorListener = new MotivSyntaxErrorListener();
    const semanticErrorListener = new MotivSemanticErrorListener(
      normalizedPropositions
    );
    parser.addErrorListener(syntaxErrorListener);
    parser.addParseListener(semanticErrorListener);
    parser.formula();

    const allErrors = [
      ...syntaxErrorListener.getErrors(),
      ...semanticErrorListener.getErrors(),
    ];

    return {
      success: allErrors.length === 0,
      errors: allErrors,
    };
  };
}
