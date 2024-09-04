// Generated from PropositionalLogic.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";


export class PropositionalLogicLexer extends antlr.Lexer {
    public static readonly PROPOSITION = 1;
    public static readonly PRIMITIVE_VALUE = 2;
    public static readonly AND_ALSO = 3;
    public static readonly OR_ELSE = 4;
    public static readonly AND = 5;
    public static readonly OR = 6;
    public static readonly NOT = 7;
    public static readonly XOR = 8;
    public static readonly LPAREN = 9;
    public static readonly RPAREN = 10;
    public static readonly LBRACE = 11;
    public static readonly RBRACE = 12;
    public static readonly IDENTIFIER_SEGMENT = 13;
    public static readonly NUMBER = 14;
    public static readonly QUOTED_STRING = 15;
    public static readonly WS = 16;
    public static readonly IGNORE_WS = 17;

    public static readonly channelNames = [
        "DEFAULT_TOKEN_CHANNEL", "HIDDEN"
    ];

    public static readonly literalNames = [
        null, null, null, "'&&'", "'||'", "'&'", "'|'", "'!'", "'^'", "'('", 
        "')'", "'{'", "'}'"
    ];

    public static readonly symbolicNames = [
        null, "PROPOSITION", "PRIMITIVE_VALUE", "AND_ALSO", "OR_ELSE", "AND", 
        "OR", "NOT", "XOR", "LPAREN", "RPAREN", "LBRACE", "RBRACE", "IDENTIFIER_SEGMENT", 
        "NUMBER", "QUOTED_STRING", "WS", "IGNORE_WS"
    ];

    public static readonly modeNames = [
        "DEFAULT_MODE",
    ];

    public static readonly ruleNames = [
        "PROPOSITION", "PROPOSITION_PARAMETER", "PRIMITIVE_VALUE", "AND_ALSO", 
        "OR_ELSE", "AND", "OR", "NOT", "XOR", "LPAREN", "RPAREN", "LBRACE", 
        "RBRACE", "IDENTIFIER_SEGMENT", "NUMBER", "QUOTED_STRING", "ESC", 
        "UNICODE", "HEX", "WS", "IGNORE_WS",
    ];


    public constructor(input: antlr.CharStream) {
        super(input);
        this.interpreter = new antlr.LexerATNSimulator(this, PropositionalLogicLexer._ATN, PropositionalLogicLexer.decisionsToDFA, new antlr.PredictionContextCache());
    }

    public get grammarFileName(): string { return "PropositionalLogic.g4"; }

    public get literalNames(): (string | null)[] { return PropositionalLogicLexer.literalNames; }
    public get symbolicNames(): (string | null)[] { return PropositionalLogicLexer.symbolicNames; }
    public get ruleNames(): string[] { return PropositionalLogicLexer.ruleNames; }

    public get serializedATN(): number[] { return PropositionalLogicLexer._serializedATN; }

    public get channelNames(): string[] { return PropositionalLogicLexer.channelNames; }

    public get modeNames(): string[] { return PropositionalLogicLexer.modeNames; }

    public static readonly _serializedATN: number[] = [
        4,0,17,137,6,-1,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,
        2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,
        13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,
        19,2,20,7,20,1,0,3,0,45,8,0,1,0,4,0,48,8,0,11,0,12,0,49,1,0,3,0,
        53,8,0,1,1,1,1,1,1,1,1,1,2,1,2,3,2,61,8,2,1,3,1,3,1,3,1,4,1,4,1,
        4,1,5,1,5,1,6,1,6,1,7,1,7,1,8,1,8,1,9,1,9,1,10,1,10,1,11,1,11,1,
        12,1,12,1,13,4,13,86,8,13,11,13,12,13,87,1,14,4,14,91,8,14,11,14,
        12,14,92,1,14,1,14,4,14,97,8,14,11,14,12,14,98,3,14,101,8,14,1,15,
        1,15,1,15,5,15,106,8,15,10,15,12,15,109,9,15,1,15,1,15,1,16,1,16,
        1,16,3,16,116,8,16,1,17,1,17,1,17,1,17,1,17,1,17,1,18,1,18,1,19,
        4,19,127,8,19,11,19,12,19,128,1,20,4,20,132,8,20,11,20,12,20,133,
        1,20,1,20,0,0,21,1,1,3,0,5,2,7,3,9,4,11,5,13,6,15,7,17,8,19,9,21,
        10,23,11,25,12,27,13,29,14,31,15,33,0,35,0,37,0,39,16,41,17,1,0,
        6,5,0,45,45,48,57,65,90,95,95,97,122,1,0,48,57,2,0,34,34,92,92,8,
        0,34,34,47,47,92,92,98,98,102,102,110,110,114,114,116,116,3,0,48,
        57,65,70,97,102,3,0,9,10,13,13,32,32,145,0,1,1,0,0,0,0,5,1,0,0,0,
        0,7,1,0,0,0,0,9,1,0,0,0,0,11,1,0,0,0,0,13,1,0,0,0,0,15,1,0,0,0,0,
        17,1,0,0,0,0,19,1,0,0,0,0,21,1,0,0,0,0,23,1,0,0,0,0,25,1,0,0,0,0,
        27,1,0,0,0,0,29,1,0,0,0,0,31,1,0,0,0,0,39,1,0,0,0,0,41,1,0,0,0,1,
        47,1,0,0,0,3,54,1,0,0,0,5,60,1,0,0,0,7,62,1,0,0,0,9,65,1,0,0,0,11,
        68,1,0,0,0,13,70,1,0,0,0,15,72,1,0,0,0,17,74,1,0,0,0,19,76,1,0,0,
        0,21,78,1,0,0,0,23,80,1,0,0,0,25,82,1,0,0,0,27,85,1,0,0,0,29,90,
        1,0,0,0,31,102,1,0,0,0,33,112,1,0,0,0,35,117,1,0,0,0,37,123,1,0,
        0,0,39,126,1,0,0,0,41,131,1,0,0,0,43,45,3,3,1,0,44,43,1,0,0,0,44,
        45,1,0,0,0,45,46,1,0,0,0,46,48,3,27,13,0,47,44,1,0,0,0,48,49,1,0,
        0,0,49,47,1,0,0,0,49,50,1,0,0,0,50,52,1,0,0,0,51,53,3,3,1,0,52,51,
        1,0,0,0,52,53,1,0,0,0,53,2,1,0,0,0,54,55,3,23,11,0,55,56,3,5,2,0,
        56,57,3,25,12,0,57,4,1,0,0,0,58,61,3,31,15,0,59,61,3,29,14,0,60,
        58,1,0,0,0,60,59,1,0,0,0,61,6,1,0,0,0,62,63,5,38,0,0,63,64,5,38,
        0,0,64,8,1,0,0,0,65,66,5,124,0,0,66,67,5,124,0,0,67,10,1,0,0,0,68,
        69,5,38,0,0,69,12,1,0,0,0,70,71,5,124,0,0,71,14,1,0,0,0,72,73,5,
        33,0,0,73,16,1,0,0,0,74,75,5,94,0,0,75,18,1,0,0,0,76,77,5,40,0,0,
        77,20,1,0,0,0,78,79,5,41,0,0,79,22,1,0,0,0,80,81,5,123,0,0,81,24,
        1,0,0,0,82,83,5,125,0,0,83,26,1,0,0,0,84,86,7,0,0,0,85,84,1,0,0,
        0,86,87,1,0,0,0,87,85,1,0,0,0,87,88,1,0,0,0,88,28,1,0,0,0,89,91,
        7,1,0,0,90,89,1,0,0,0,91,92,1,0,0,0,92,90,1,0,0,0,92,93,1,0,0,0,
        93,100,1,0,0,0,94,96,5,46,0,0,95,97,7,1,0,0,96,95,1,0,0,0,97,98,
        1,0,0,0,98,96,1,0,0,0,98,99,1,0,0,0,99,101,1,0,0,0,100,94,1,0,0,
        0,100,101,1,0,0,0,101,30,1,0,0,0,102,107,5,34,0,0,103,106,3,33,16,
        0,104,106,8,2,0,0,105,103,1,0,0,0,105,104,1,0,0,0,106,109,1,0,0,
        0,107,105,1,0,0,0,107,108,1,0,0,0,108,110,1,0,0,0,109,107,1,0,0,
        0,110,111,5,34,0,0,111,32,1,0,0,0,112,115,5,92,0,0,113,116,7,3,0,
        0,114,116,3,35,17,0,115,113,1,0,0,0,115,114,1,0,0,0,116,34,1,0,0,
        0,117,118,5,117,0,0,118,119,3,37,18,0,119,120,3,37,18,0,120,121,
        3,37,18,0,121,122,3,37,18,0,122,36,1,0,0,0,123,124,7,4,0,0,124,38,
        1,0,0,0,125,127,7,5,0,0,126,125,1,0,0,0,127,128,1,0,0,0,128,126,
        1,0,0,0,128,129,1,0,0,0,129,40,1,0,0,0,130,132,7,5,0,0,131,130,1,
        0,0,0,132,133,1,0,0,0,133,131,1,0,0,0,133,134,1,0,0,0,134,135,1,
        0,0,0,135,136,6,20,0,0,136,42,1,0,0,0,14,0,44,49,52,60,87,92,98,
        100,105,107,115,128,133,1,6,0,0
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!PropositionalLogicLexer.__ATN) {
            PropositionalLogicLexer.__ATN = new antlr.ATNDeserializer().deserialize(PropositionalLogicLexer._serializedATN);
        }

        return PropositionalLogicLexer.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(PropositionalLogicLexer.literalNames, PropositionalLogicLexer.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return PropositionalLogicLexer.vocabulary;
    }

    private static readonly decisionsToDFA = PropositionalLogicLexer._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}