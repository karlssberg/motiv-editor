import { CharStream, CommonTokenStream, Token } from 'antlr4ng';
import { PropositionalLogicLexer } from './antlr/PropositionalLogicLexer';
import { TokenType } from './TokenType';

export interface HighlightToken {
  type: TokenType;
  text: string;
  start: number;
  stop: number;
}

export function* getSyntax(text: string): Iterable<HighlightToken> {
  const charStream = CharStream.fromString(text);
  const lexer = new PropositionalLogicLexer(charStream);
  const tokenStream = new CommonTokenStream(lexer);
  tokenStream.fill();

  let processedText = '';
  let currentIndex = 0;

  for (const token of tokenStream.getTokens()) {
    if (token.type === PropositionalLogicLexer.EOF) break;

    const tokenStart = token.start;
    const tokenEnd = token.stop + 1;

    if (tokenStart > currentIndex) {
      processedText += text.substring(currentIndex, tokenStart);
      continue;
    }

    const tokenText = text.substring(tokenStart, tokenEnd);

    const tokenType = getTokenType(token);
    yield {
      type: tokenType,
      text: tokenText,
      start: processedText.length,
      stop: processedText.length + tokenText.length,
    };

    currentIndex = tokenEnd;
  }
}

function getTokenType(token: Token): TokenType {
  switch (token.type) {
    case PropositionalLogicLexer.ANDALSO:
      return 'andalso';
    case PropositionalLogicLexer.AND:
      return 'and';
    case PropositionalLogicLexer.ORELSE:
      return 'orelse';
    case PropositionalLogicLexer.OR:
      return 'or';
    case PropositionalLogicLexer.NOT:
      return 'not';
    case PropositionalLogicLexer.XOR:
      return 'xor';
    case PropositionalLogicLexer.VARIABLE:
      return 'atom';
    case PropositionalLogicLexer.LPAREN:
      return 'openParenthesis';
    case PropositionalLogicLexer.RPAREN:
      return 'closeParenthesis';
    default:
      return 'whitespace';
  }
}
