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
import { Proposition } from '../../Proposition';

export interface ErrorInfo {
  line: number;
  column: number;
  token: Token | null;
  message: string | undefined;
}

export function createMotivParser(
  propositions: Proposition[]
): (input: string) => MotivParserResult {
  return (input: string) => {
    const tokenStream = createMotivLexer(input);
    const parser = new PropositionalLogicParser(tokenStream);

    const syntaxErrorListener = new MotivSyntaxErrorListener();
    const semanticErrorListener = new MotivSemanticErrorListener(propositions);
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

class MotivSemanticErrorListener extends PropositionalLogicListener {
  private readonly errors: ErrorInfo[] = [];
  private readonly propositionLookup: Map<string, Proposition>;

  constructor(propositions: Proposition[]) {
    super();
    this.propositionLookup = new Map(
      propositions.map((p) => [Proposition.normalizeProposition(p.template), p])
    );
  }
  exitProposition = (ctx: PropositionContext): void => {
    const propositionExpression = ctx.getText();
    const [isValidProposition, errors] = this.validateProposition(
      propositionExpression
    );
    if (!isValidProposition) {
      this.errors.push({
        line: ctx.start!.line,
        column: ctx.start!.column,
        token: ctx.start,
        message: errors.join('\n'),
      });
    }
  };

  getErrors(): ErrorInfo[] {
    return this.errors;
  }

  validateProposition(propositionExpression: string): [boolean, string[]] {
    const proposition = this.propositionLookup.get(
      Proposition.normalizeProposition(propositionExpression)
    );

    if (!proposition) {
      return [
        false,
        [`The name '${propositionExpression}' is not a recognized proposition`],
      ];
    }
    const [isValid, errors] = proposition.validateExpression(
      propositionExpression
    );

    return isValid ? [true, []] : [false, errors];
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

function createMotivLexer(input: string) {
  const charStream = CharStream.fromString(input);
  const lexer = new PropositionalLogicLexer(charStream);
  const tokenStream = new CommonTokenStream(lexer);
  return tokenStream;
}
