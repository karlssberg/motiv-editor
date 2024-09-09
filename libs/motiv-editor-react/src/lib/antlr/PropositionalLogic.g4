grammar PropositionalLogic;
// Parser Rules
formula
    : expression EOF
    ;

expression
    : conditionalOrExpression
    ;
    
conditionalOrExpression
    : conditionalAndExpression (OR_ELSE conditionalAndExpression)*
    ;
    
conditionalAndExpression
    : orExpression (AND_ALSO orExpression)*
    ;
    
orExpression
    : xorExpression (OR xorExpression)*
    ;
    
xorExpression
    : andExpression (XOR andExpression)*
    ;

andExpression
    : notExpression (AND notExpression)*
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
PROPOSITION                    : IDENTIFIER_SEGMENT_START ( IDENTIFIER_SEGMENT | PARAMETER )*;
PARAMETER                      : '{' ( ESC | ~[}\\] )* '}';
fragment ESC                   : '\\' ([}\\/bfnrt] | UNICODE);
fragment UNICODE               : 'u' HEX HEX HEX HEX;
fragment HEX                   : [0-9a-fA-F];
AND_ALSO                       : '&&';
OR_ELSE                        : '||';
AND 	                       : '&';
OR                             : '|';
NOT                            : '!';
XOR                            : '^';
LPAREN                         : '(';
RPAREN                         : ')';
IDENTIFIER_SEGMENT_START       : [\p{L}_];
IDENTIFIER_SEGMENT             : [\p{L}\p{Nd}_\-]+;
WS                             : [ \t\r\n]+ -> skip;

