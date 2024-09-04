type OperatorTypes = 'and' | 'andalso' | 'or' | 'orelse' | 'not' | 'xor';
type VariableTypes = 'proposition';
type PunctuationTypes = 'openParenthesis' | 'closeParenthesis';
type IgnoredTypes = 'whitespace' | 'newline';

export type TokenType =
  | OperatorTypes
  | VariableTypes
  | PunctuationTypes
  | IgnoredTypes
  | 'eof';

export const operatorLiteralToTokenType: {
  [operatorLiteralToTokenType: string]: OperatorTypes;
} = {
  '&&': 'andalso',
  '&': 'and',
  '||': 'orelse',
  '|': 'or',
  '!': 'not',
  '^': 'xor',
};
