grammar PropositionalLogic;
// Parser Rules
formula
    : expression EOF
    ;

expression
    : conditionalOrExpression
    ;
    
conditionalOrExpression
    : conditionalAndExpression (conditionalOrOperator conditionalAndExpression)*
    ;
    
conditionalAndExpression
    : orExpression (conditionalAndOperator orExpression)*
    ;
    
orExpression
    : xorExpression (orOperator xorExpression)*
    ;
    
xorExpression
    : andExpression (xorOperator andExpression)*
    ;

andExpression
    : notExpression (andOperator notExpression)*
    ;

notExpression
    : leftParenthesis conditionalOrExpression rightParenthesis
    | notOperator notExpression
    | proposition
    ;

andOperator: AND;
orOperator: OR;    
xorOperator: XOR;    
notOperator: NOT;    
conditionalAndOperator: AND_ALSO;    
conditionalOrOperator: OR_ELSE;    
leftParenthesis: LPAREN;    
rightParenthesis: RPAREN;
proposition: PROPOSITION;

// Lexer Rules
LPAREN                         : '(';
RPAREN                         : ')';
AND_ALSO                       : '&&';
OR_ELSE                        : '||';
AND 	                       : '&';
OR                             : '|';
NOT                            : '!';
XOR                            : '^';
PROPOSITION                    : IDENTIFIER_SEGMENT_START ( IDENTIFIER_SEGMENT | PARAMETER )*;
PARAMETER                      : '{' ( ESC | ~[}\\] )* '}';
fragment ESC                   : '\\' ([}\\/bfnrt] | UNICODE);
fragment UNICODE               : 'u' HEX HEX HEX HEX;
fragment HEX                   : [0-9a-fA-F];
IDENTIFIER_SEGMENT_START       : [\p{L}_];
IDENTIFIER_SEGMENT             : [\p{L}\p{Nd}_\-]+;
WS                             : [ \t\r\n]+ -> skip;

