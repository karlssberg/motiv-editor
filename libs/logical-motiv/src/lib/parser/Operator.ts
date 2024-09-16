export interface OperatorMeta {
  name: string;
  symbol: string;
}

interface Operator {
  and: OperatorMeta;
  andAlso: OperatorMeta;
  or: OperatorMeta;
  orElse: OperatorMeta;
  xor: OperatorMeta;
  not: OperatorMeta;
}

export const operator: Operator = {
  and: { name: 'and', symbol: '&' },
  andAlso: { name: 'and-also', symbol: '&&' },
  or: { name: 'or', symbol: '|' },
  orElse: { name: 'or-else', symbol: '||' },
  xor: { name: 'xor', symbol: '^' },
  not: { name: 'not', symbol: '!' },
};
