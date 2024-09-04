grammar PropositionalLogic;
// Parser Rules
formula
    : expression EOF
    ;

expression
    : xorExpression
    ;

xorExpression
    : orExpression (WS XOR WS orExpression)*
    ;

orExpression
    : andExpression (WS (OR | OR_ELSE) WS andExpression)*
    ;

andExpression
    : notExpression (WS (AND | AND_ALSO) WS notExpression)*
    ;

notExpression
    : NOT notExpression
    | LPAREN expression RPAREN
    | proposition
    ;

proposition
    : PROPOSITION
    ;
    

// Lexer Rules
PROPOSITION                    : (PROPOSITION_PARAMETER? IDENTIFIER_SEGMENT )+ PROPOSITION_PARAMETER?;
fragment PROPOSITION_PARAMETER : LBRACE PRIMITIVE_VALUE RBRACE;    
PRIMITIVE_VALUE                : QUOTED_STRING | NUMBER;
AND_ALSO                       : '&&';
OR_ELSE                        : '||';
AND 	                       : '&';
OR                             : '|';
NOT                            : '!';
XOR                            : '^';
LPAREN                         : '(';
RPAREN                         : ')';
LBRACE                         : '{';
RBRACE                         : '}';
IDENTIFIER_SEGMENT             : [a-zA-Z0-9_\-]+;
NUMBER                         : [0-9]+('.'[0-9]+)?;
QUOTED_STRING                  : '"' ( ESC | ~["\\] )* '"';
fragment ESC                   : '\\' (["\\/bfnrt] | UNICODE);
fragment UNICODE               : 'u' HEX HEX HEX HEX;
fragment HEX                   : [0-9a-fA-F];
WS                             : [ \t\r\n]+;
IGNORE_WS                      : [ \t\r\n]+ -> skip;

