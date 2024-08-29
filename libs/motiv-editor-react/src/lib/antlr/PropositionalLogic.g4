grammar PropositionalLogic;
// Parser Rules
formula
    : expression EOF
    ;

expression
    : xorExpression
    ;

xorExpression
    : orExpression (XOR orExpression)*
    ;

orExpression
    : andExpression ((OR | ORELSE) andExpression)*
    ;

andExpression
    : notExpression ((AND | ANDALSO)  notExpression)*
    ;

notExpression
    : NOT notExpression
    | LPAREN expression RPAREN
    | atom
    ;

atom
    : VARIABLE
    ;

// Lexer Rules
ANDALSO : '&&';
ORELSE  : '||';
AND 	: '&';
OR      : '|';
NOT     : '!';
XOR     : '^';
LPAREN  : '(';
RPAREN  : ')';
VARIABLE: [a-zA-Z0-9_\-]+;
WS      : [ \t\r\n]+ -> skip;

