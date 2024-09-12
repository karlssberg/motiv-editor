export type OperatorTypes = 'and' | 'andalso' | 'or' | 'orelse' | 'not' | 'xor';
export type VariableTypes = 'proposition';
export type PunctuationTypes = 'openParenthesis' | 'closeParenthesis';
export type IgnoredTypes = 'whitespace' | 'newline';

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
