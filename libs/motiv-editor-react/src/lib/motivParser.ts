import { PropositionalLogicListener } from './antlr/PropositionalLogicListener';
import {
  AtomContext,
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

export interface ErrorInfo {
  line: number;
  column: number;
  token: Token | null;
  message: string | undefined;
}

class MotivSemanticErrorListener extends PropositionalLogicListener {
  private readonly atoms: Set<string>;
  private readonly errors: ErrorInfo[] = [];

  constructor(atoms: string[]) {
    super();
    this.atoms = new Set(atoms);
  }
  exitAtom = (ctx: AtomContext): void => {
    const atom = ctx.getText();
    if (!this.atoms.has(atom)) {
      this.errors.push({
        line: ctx.start!.line,
        column: ctx.start!.column,
        token: ctx.start,
        message: `The name '${atom}' is not a recognized proposition`,
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

export function createMotivParser(
  propositions: string[]
): (input: string) => MotivParserResult {
  return (input: string) => {
    const charStream = CharStream.fromString(input);
    const lexer = new PropositionalLogicLexer(charStream);
    const tokenStream = new CommonTokenStream(lexer);
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
