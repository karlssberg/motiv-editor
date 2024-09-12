// Generated from PropositionalLogic.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { PropositionalLogicListener } from "./PropositionalLogicListener.js";
import { PropositionalLogicVisitor } from "./PropositionalLogicVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class PropositionalLogicParser extends antlr.Parser {
    public static readonly LPAREN = 1;
    public static readonly RPAREN = 2;
    public static readonly AND_ALSO = 3;
    public static readonly OR_ELSE = 4;
    public static readonly AND = 5;
    public static readonly OR = 6;
    public static readonly NOT = 7;
    public static readonly XOR = 8;
    public static readonly PROPOSITION = 9;
    public static readonly PARAMETER = 10;
    public static readonly IDENTIFIER_SEGMENT_START = 11;
    public static readonly IDENTIFIER_SEGMENT = 12;
    public static readonly WS = 13;
    public static readonly RULE_formula = 0;
    public static readonly RULE_expression = 1;
    public static readonly RULE_conditionalOrExpression = 2;
    public static readonly RULE_conditionalAndExpression = 3;
    public static readonly RULE_orExpression = 4;
    public static readonly RULE_xorExpression = 5;
    public static readonly RULE_andExpression = 6;
    public static readonly RULE_notExpression = 7;
    public static readonly RULE_andOperator = 8;
    public static readonly RULE_orOperator = 9;
    public static readonly RULE_xorOperator = 10;
    public static readonly RULE_notOperator = 11;
    public static readonly RULE_conditionalAndOperator = 12;
    public static readonly RULE_conditionalOrOperator = 13;
    public static readonly RULE_leftParenthesis = 14;
    public static readonly RULE_rightParenthesis = 15;
    public static readonly RULE_proposition = 16;

    public static readonly literalNames = [
        null, "'('", "')'", "'&&'", "'||'", "'&'", "'|'", "'!'", "'^'"
    ];

    public static readonly symbolicNames = [
        null, "LPAREN", "RPAREN", "AND_ALSO", "OR_ELSE", "AND", "OR", "NOT", 
        "XOR", "PROPOSITION", "PARAMETER", "IDENTIFIER_SEGMENT_START", "IDENTIFIER_SEGMENT", 
        "WS"
    ];
    public static readonly ruleNames = [
        "formula", "expression", "conditionalOrExpression", "conditionalAndExpression", 
        "orExpression", "xorExpression", "andExpression", "notExpression", 
        "andOperator", "orOperator", "xorOperator", "notOperator", "conditionalAndOperator", 
        "conditionalOrOperator", "leftParenthesis", "rightParenthesis", 
        "proposition",
    ];

    public get grammarFileName(): string { return "PropositionalLogic.g4"; }
    public get literalNames(): (string | null)[] { return PropositionalLogicParser.literalNames; }
    public get symbolicNames(): (string | null)[] { return PropositionalLogicParser.symbolicNames; }
    public get ruleNames(): string[] { return PropositionalLogicParser.ruleNames; }
    public get serializedATN(): number[] { return PropositionalLogicParser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, PropositionalLogicParser._ATN, PropositionalLogicParser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public formula(): FormulaContext {
        let localContext = new FormulaContext(this.context, this.state);
        this.enterRule(localContext, 0, PropositionalLogicParser.RULE_formula);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 34;
            this.expression();
            this.state = 35;
            this.match(PropositionalLogicParser.EOF);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public expression(): ExpressionContext {
        let localContext = new ExpressionContext(this.context, this.state);
        this.enterRule(localContext, 2, PropositionalLogicParser.RULE_expression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 37;
            this.conditionalOrExpression();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public conditionalOrExpression(): ConditionalOrExpressionContext {
        let localContext = new ConditionalOrExpressionContext(this.context, this.state);
        this.enterRule(localContext, 4, PropositionalLogicParser.RULE_conditionalOrExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 39;
            this.conditionalAndExpression();
            this.state = 45;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 4) {
                {
                {
                this.state = 40;
                this.conditionalOrOperator();
                this.state = 41;
                this.conditionalAndExpression();
                }
                }
                this.state = 47;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public conditionalAndExpression(): ConditionalAndExpressionContext {
        let localContext = new ConditionalAndExpressionContext(this.context, this.state);
        this.enterRule(localContext, 6, PropositionalLogicParser.RULE_conditionalAndExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 48;
            this.orExpression();
            this.state = 54;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 3) {
                {
                {
                this.state = 49;
                this.conditionalAndOperator();
                this.state = 50;
                this.orExpression();
                }
                }
                this.state = 56;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public orExpression(): OrExpressionContext {
        let localContext = new OrExpressionContext(this.context, this.state);
        this.enterRule(localContext, 8, PropositionalLogicParser.RULE_orExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 57;
            this.xorExpression();
            this.state = 63;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 6) {
                {
                {
                this.state = 58;
                this.orOperator();
                this.state = 59;
                this.xorExpression();
                }
                }
                this.state = 65;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public xorExpression(): XorExpressionContext {
        let localContext = new XorExpressionContext(this.context, this.state);
        this.enterRule(localContext, 10, PropositionalLogicParser.RULE_xorExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 66;
            this.andExpression();
            this.state = 72;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 8) {
                {
                {
                this.state = 67;
                this.xorOperator();
                this.state = 68;
                this.andExpression();
                }
                }
                this.state = 74;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public andExpression(): AndExpressionContext {
        let localContext = new AndExpressionContext(this.context, this.state);
        this.enterRule(localContext, 12, PropositionalLogicParser.RULE_andExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 75;
            this.notExpression();
            this.state = 81;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 76;
                this.andOperator();
                this.state = 77;
                this.notExpression();
                }
                }
                this.state = 83;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public notExpression(): NotExpressionContext {
        let localContext = new NotExpressionContext(this.context, this.state);
        this.enterRule(localContext, 14, PropositionalLogicParser.RULE_notExpression);
        try {
            this.state = 92;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case PropositionalLogicParser.LPAREN:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 84;
                this.leftParenthesis();
                this.state = 85;
                this.conditionalOrExpression();
                this.state = 86;
                this.rightParenthesis();
                }
                break;
            case PropositionalLogicParser.NOT:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 88;
                this.notOperator();
                this.state = 89;
                this.notExpression();
                }
                break;
            case PropositionalLogicParser.PROPOSITION:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 91;
                this.proposition();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public andOperator(): AndOperatorContext {
        let localContext = new AndOperatorContext(this.context, this.state);
        this.enterRule(localContext, 16, PropositionalLogicParser.RULE_andOperator);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 94;
            this.match(PropositionalLogicParser.AND);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public orOperator(): OrOperatorContext {
        let localContext = new OrOperatorContext(this.context, this.state);
        this.enterRule(localContext, 18, PropositionalLogicParser.RULE_orOperator);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 96;
            this.match(PropositionalLogicParser.OR);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public xorOperator(): XorOperatorContext {
        let localContext = new XorOperatorContext(this.context, this.state);
        this.enterRule(localContext, 20, PropositionalLogicParser.RULE_xorOperator);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 98;
            this.match(PropositionalLogicParser.XOR);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public notOperator(): NotOperatorContext {
        let localContext = new NotOperatorContext(this.context, this.state);
        this.enterRule(localContext, 22, PropositionalLogicParser.RULE_notOperator);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 100;
            this.match(PropositionalLogicParser.NOT);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public conditionalAndOperator(): ConditionalAndOperatorContext {
        let localContext = new ConditionalAndOperatorContext(this.context, this.state);
        this.enterRule(localContext, 24, PropositionalLogicParser.RULE_conditionalAndOperator);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 102;
            this.match(PropositionalLogicParser.AND_ALSO);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public conditionalOrOperator(): ConditionalOrOperatorContext {
        let localContext = new ConditionalOrOperatorContext(this.context, this.state);
        this.enterRule(localContext, 26, PropositionalLogicParser.RULE_conditionalOrOperator);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 104;
            this.match(PropositionalLogicParser.OR_ELSE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public leftParenthesis(): LeftParenthesisContext {
        let localContext = new LeftParenthesisContext(this.context, this.state);
        this.enterRule(localContext, 28, PropositionalLogicParser.RULE_leftParenthesis);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 106;
            this.match(PropositionalLogicParser.LPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public rightParenthesis(): RightParenthesisContext {
        let localContext = new RightParenthesisContext(this.context, this.state);
        this.enterRule(localContext, 30, PropositionalLogicParser.RULE_rightParenthesis);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 108;
            this.match(PropositionalLogicParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public proposition(): PropositionContext {
        let localContext = new PropositionContext(this.context, this.state);
        this.enterRule(localContext, 32, PropositionalLogicParser.RULE_proposition);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 110;
            this.match(PropositionalLogicParser.PROPOSITION);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public static readonly _serializedATN: number[] = [
        4,1,13,113,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,1,0,1,0,1,0,1,1,1,1,1,2,1,2,1,2,1,
        2,5,2,44,8,2,10,2,12,2,47,9,2,1,3,1,3,1,3,1,3,5,3,53,8,3,10,3,12,
        3,56,9,3,1,4,1,4,1,4,1,4,5,4,62,8,4,10,4,12,4,65,9,4,1,5,1,5,1,5,
        1,5,5,5,71,8,5,10,5,12,5,74,9,5,1,6,1,6,1,6,1,6,5,6,80,8,6,10,6,
        12,6,83,9,6,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,3,7,93,8,7,1,8,1,8,1,
        9,1,9,1,10,1,10,1,11,1,11,1,12,1,12,1,13,1,13,1,14,1,14,1,15,1,15,
        1,16,1,16,1,16,0,0,17,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,
        32,0,0,102,0,34,1,0,0,0,2,37,1,0,0,0,4,39,1,0,0,0,6,48,1,0,0,0,8,
        57,1,0,0,0,10,66,1,0,0,0,12,75,1,0,0,0,14,92,1,0,0,0,16,94,1,0,0,
        0,18,96,1,0,0,0,20,98,1,0,0,0,22,100,1,0,0,0,24,102,1,0,0,0,26,104,
        1,0,0,0,28,106,1,0,0,0,30,108,1,0,0,0,32,110,1,0,0,0,34,35,3,2,1,
        0,35,36,5,0,0,1,36,1,1,0,0,0,37,38,3,4,2,0,38,3,1,0,0,0,39,45,3,
        6,3,0,40,41,3,26,13,0,41,42,3,6,3,0,42,44,1,0,0,0,43,40,1,0,0,0,
        44,47,1,0,0,0,45,43,1,0,0,0,45,46,1,0,0,0,46,5,1,0,0,0,47,45,1,0,
        0,0,48,54,3,8,4,0,49,50,3,24,12,0,50,51,3,8,4,0,51,53,1,0,0,0,52,
        49,1,0,0,0,53,56,1,0,0,0,54,52,1,0,0,0,54,55,1,0,0,0,55,7,1,0,0,
        0,56,54,1,0,0,0,57,63,3,10,5,0,58,59,3,18,9,0,59,60,3,10,5,0,60,
        62,1,0,0,0,61,58,1,0,0,0,62,65,1,0,0,0,63,61,1,0,0,0,63,64,1,0,0,
        0,64,9,1,0,0,0,65,63,1,0,0,0,66,72,3,12,6,0,67,68,3,20,10,0,68,69,
        3,12,6,0,69,71,1,0,0,0,70,67,1,0,0,0,71,74,1,0,0,0,72,70,1,0,0,0,
        72,73,1,0,0,0,73,11,1,0,0,0,74,72,1,0,0,0,75,81,3,14,7,0,76,77,3,
        16,8,0,77,78,3,14,7,0,78,80,1,0,0,0,79,76,1,0,0,0,80,83,1,0,0,0,
        81,79,1,0,0,0,81,82,1,0,0,0,82,13,1,0,0,0,83,81,1,0,0,0,84,85,3,
        28,14,0,85,86,3,4,2,0,86,87,3,30,15,0,87,93,1,0,0,0,88,89,3,22,11,
        0,89,90,3,14,7,0,90,93,1,0,0,0,91,93,3,32,16,0,92,84,1,0,0,0,92,
        88,1,0,0,0,92,91,1,0,0,0,93,15,1,0,0,0,94,95,5,5,0,0,95,17,1,0,0,
        0,96,97,5,6,0,0,97,19,1,0,0,0,98,99,5,8,0,0,99,21,1,0,0,0,100,101,
        5,7,0,0,101,23,1,0,0,0,102,103,5,3,0,0,103,25,1,0,0,0,104,105,5,
        4,0,0,105,27,1,0,0,0,106,107,5,1,0,0,107,29,1,0,0,0,108,109,5,2,
        0,0,109,31,1,0,0,0,110,111,5,9,0,0,111,33,1,0,0,0,6,45,54,63,72,
        81,92
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!PropositionalLogicParser.__ATN) {
            PropositionalLogicParser.__ATN = new antlr.ATNDeserializer().deserialize(PropositionalLogicParser._serializedATN);
        }

        return PropositionalLogicParser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(PropositionalLogicParser.literalNames, PropositionalLogicParser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return PropositionalLogicParser.vocabulary;
    }

    private static readonly decisionsToDFA = PropositionalLogicParser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class FormulaContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(PropositionalLogicParser.EOF, 0)!;
    }
    public override get ruleIndex(): number {
        return PropositionalLogicParser.RULE_formula;
    }
    public override enterRule(listener: PropositionalLogicListener): void {
        if(listener.enterFormula) {
             listener.enterFormula(this);
        }
    }
    public override exitRule(listener: PropositionalLogicListener): void {
        if(listener.exitFormula) {
             listener.exitFormula(this);
        }
    }
    public override accept<Result>(visitor: PropositionalLogicVisitor<Result>): Result | null {
        if (visitor.visitFormula) {
            return visitor.visitFormula(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public conditionalOrExpression(): ConditionalOrExpressionContext {
        return this.getRuleContext(0, ConditionalOrExpressionContext)!;
    }
    public override get ruleIndex(): number {
        return PropositionalLogicParser.RULE_expression;
    }
    public override enterRule(listener: PropositionalLogicListener): void {
        if(listener.enterExpression) {
             listener.enterExpression(this);
        }
    }
    public override exitRule(listener: PropositionalLogicListener): void {
        if(listener.exitExpression) {
             listener.exitExpression(this);
        }
    }
    public override accept<Result>(visitor: PropositionalLogicVisitor<Result>): Result | null {
        if (visitor.visitExpression) {
            return visitor.visitExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ConditionalOrExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public conditionalAndExpression(): ConditionalAndExpressionContext[];
    public conditionalAndExpression(i: number): ConditionalAndExpressionContext | null;
    public conditionalAndExpression(i?: number): ConditionalAndExpressionContext[] | ConditionalAndExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ConditionalAndExpressionContext);
        }

        return this.getRuleContext(i, ConditionalAndExpressionContext);
    }
    public conditionalOrOperator(): ConditionalOrOperatorContext[];
    public conditionalOrOperator(i: number): ConditionalOrOperatorContext | null;
    public conditionalOrOperator(i?: number): ConditionalOrOperatorContext[] | ConditionalOrOperatorContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ConditionalOrOperatorContext);
        }

        return this.getRuleContext(i, ConditionalOrOperatorContext);
    }
    public override get ruleIndex(): number {
        return PropositionalLogicParser.RULE_conditionalOrExpression;
    }
    public override enterRule(listener: PropositionalLogicListener): void {
        if(listener.enterConditionalOrExpression) {
             listener.enterConditionalOrExpression(this);
        }
    }
    public override exitRule(listener: PropositionalLogicListener): void {
        if(listener.exitConditionalOrExpression) {
             listener.exitConditionalOrExpression(this);
        }
    }
    public override accept<Result>(visitor: PropositionalLogicVisitor<Result>): Result | null {
        if (visitor.visitConditionalOrExpression) {
            return visitor.visitConditionalOrExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ConditionalAndExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public orExpression(): OrExpressionContext[];
    public orExpression(i: number): OrExpressionContext | null;
    public orExpression(i?: number): OrExpressionContext[] | OrExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(OrExpressionContext);
        }

        return this.getRuleContext(i, OrExpressionContext);
    }
    public conditionalAndOperator(): ConditionalAndOperatorContext[];
    public conditionalAndOperator(i: number): ConditionalAndOperatorContext | null;
    public conditionalAndOperator(i?: number): ConditionalAndOperatorContext[] | ConditionalAndOperatorContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ConditionalAndOperatorContext);
        }

        return this.getRuleContext(i, ConditionalAndOperatorContext);
    }
    public override get ruleIndex(): number {
        return PropositionalLogicParser.RULE_conditionalAndExpression;
    }
    public override enterRule(listener: PropositionalLogicListener): void {
        if(listener.enterConditionalAndExpression) {
             listener.enterConditionalAndExpression(this);
        }
    }
    public override exitRule(listener: PropositionalLogicListener): void {
        if(listener.exitConditionalAndExpression) {
             listener.exitConditionalAndExpression(this);
        }
    }
    public override accept<Result>(visitor: PropositionalLogicVisitor<Result>): Result | null {
        if (visitor.visitConditionalAndExpression) {
            return visitor.visitConditionalAndExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class OrExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public xorExpression(): XorExpressionContext[];
    public xorExpression(i: number): XorExpressionContext | null;
    public xorExpression(i?: number): XorExpressionContext[] | XorExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(XorExpressionContext);
        }

        return this.getRuleContext(i, XorExpressionContext);
    }
    public orOperator(): OrOperatorContext[];
    public orOperator(i: number): OrOperatorContext | null;
    public orOperator(i?: number): OrOperatorContext[] | OrOperatorContext | null {
        if (i === undefined) {
            return this.getRuleContexts(OrOperatorContext);
        }

        return this.getRuleContext(i, OrOperatorContext);
    }
    public override get ruleIndex(): number {
        return PropositionalLogicParser.RULE_orExpression;
    }
    public override enterRule(listener: PropositionalLogicListener): void {
        if(listener.enterOrExpression) {
             listener.enterOrExpression(this);
        }
    }
    public override exitRule(listener: PropositionalLogicListener): void {
        if(listener.exitOrExpression) {
             listener.exitOrExpression(this);
        }
    }
    public override accept<Result>(visitor: PropositionalLogicVisitor<Result>): Result | null {
        if (visitor.visitOrExpression) {
            return visitor.visitOrExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class XorExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public andExpression(): AndExpressionContext[];
    public andExpression(i: number): AndExpressionContext | null;
    public andExpression(i?: number): AndExpressionContext[] | AndExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AndExpressionContext);
        }

        return this.getRuleContext(i, AndExpressionContext);
    }
    public xorOperator(): XorOperatorContext[];
    public xorOperator(i: number): XorOperatorContext | null;
    public xorOperator(i?: number): XorOperatorContext[] | XorOperatorContext | null {
        if (i === undefined) {
            return this.getRuleContexts(XorOperatorContext);
        }

        return this.getRuleContext(i, XorOperatorContext);
    }
    public override get ruleIndex(): number {
        return PropositionalLogicParser.RULE_xorExpression;
    }
    public override enterRule(listener: PropositionalLogicListener): void {
        if(listener.enterXorExpression) {
             listener.enterXorExpression(this);
        }
    }
    public override exitRule(listener: PropositionalLogicListener): void {
        if(listener.exitXorExpression) {
             listener.exitXorExpression(this);
        }
    }
    public override accept<Result>(visitor: PropositionalLogicVisitor<Result>): Result | null {
        if (visitor.visitXorExpression) {
            return visitor.visitXorExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class AndExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public notExpression(): NotExpressionContext[];
    public notExpression(i: number): NotExpressionContext | null;
    public notExpression(i?: number): NotExpressionContext[] | NotExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(NotExpressionContext);
        }

        return this.getRuleContext(i, NotExpressionContext);
    }
    public andOperator(): AndOperatorContext[];
    public andOperator(i: number): AndOperatorContext | null;
    public andOperator(i?: number): AndOperatorContext[] | AndOperatorContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AndOperatorContext);
        }

        return this.getRuleContext(i, AndOperatorContext);
    }
    public override get ruleIndex(): number {
        return PropositionalLogicParser.RULE_andExpression;
    }
    public override enterRule(listener: PropositionalLogicListener): void {
        if(listener.enterAndExpression) {
             listener.enterAndExpression(this);
        }
    }
    public override exitRule(listener: PropositionalLogicListener): void {
        if(listener.exitAndExpression) {
             listener.exitAndExpression(this);
        }
    }
    public override accept<Result>(visitor: PropositionalLogicVisitor<Result>): Result | null {
        if (visitor.visitAndExpression) {
            return visitor.visitAndExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class NotExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public leftParenthesis(): LeftParenthesisContext | null {
        return this.getRuleContext(0, LeftParenthesisContext);
    }
    public conditionalOrExpression(): ConditionalOrExpressionContext | null {
        return this.getRuleContext(0, ConditionalOrExpressionContext);
    }
    public rightParenthesis(): RightParenthesisContext | null {
        return this.getRuleContext(0, RightParenthesisContext);
    }
    public notOperator(): NotOperatorContext | null {
        return this.getRuleContext(0, NotOperatorContext);
    }
    public notExpression(): NotExpressionContext | null {
        return this.getRuleContext(0, NotExpressionContext);
    }
    public proposition(): PropositionContext | null {
        return this.getRuleContext(0, PropositionContext);
    }
    public override get ruleIndex(): number {
        return PropositionalLogicParser.RULE_notExpression;
    }
    public override enterRule(listener: PropositionalLogicListener): void {
        if(listener.enterNotExpression) {
             listener.enterNotExpression(this);
        }
    }
    public override exitRule(listener: PropositionalLogicListener): void {
        if(listener.exitNotExpression) {
             listener.exitNotExpression(this);
        }
    }
    public override accept<Result>(visitor: PropositionalLogicVisitor<Result>): Result | null {
        if (visitor.visitNotExpression) {
            return visitor.visitNotExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class AndOperatorContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public AND(): antlr.TerminalNode {
        return this.getToken(PropositionalLogicParser.AND, 0)!;
    }
    public override get ruleIndex(): number {
        return PropositionalLogicParser.RULE_andOperator;
    }
    public override enterRule(listener: PropositionalLogicListener): void {
        if(listener.enterAndOperator) {
             listener.enterAndOperator(this);
        }
    }
    public override exitRule(listener: PropositionalLogicListener): void {
        if(listener.exitAndOperator) {
             listener.exitAndOperator(this);
        }
    }
    public override accept<Result>(visitor: PropositionalLogicVisitor<Result>): Result | null {
        if (visitor.visitAndOperator) {
            return visitor.visitAndOperator(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class OrOperatorContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public OR(): antlr.TerminalNode {
        return this.getToken(PropositionalLogicParser.OR, 0)!;
    }
    public override get ruleIndex(): number {
        return PropositionalLogicParser.RULE_orOperator;
    }
    public override enterRule(listener: PropositionalLogicListener): void {
        if(listener.enterOrOperator) {
             listener.enterOrOperator(this);
        }
    }
    public override exitRule(listener: PropositionalLogicListener): void {
        if(listener.exitOrOperator) {
             listener.exitOrOperator(this);
        }
    }
    public override accept<Result>(visitor: PropositionalLogicVisitor<Result>): Result | null {
        if (visitor.visitOrOperator) {
            return visitor.visitOrOperator(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class XorOperatorContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public XOR(): antlr.TerminalNode {
        return this.getToken(PropositionalLogicParser.XOR, 0)!;
    }
    public override get ruleIndex(): number {
        return PropositionalLogicParser.RULE_xorOperator;
    }
    public override enterRule(listener: PropositionalLogicListener): void {
        if(listener.enterXorOperator) {
             listener.enterXorOperator(this);
        }
    }
    public override exitRule(listener: PropositionalLogicListener): void {
        if(listener.exitXorOperator) {
             listener.exitXorOperator(this);
        }
    }
    public override accept<Result>(visitor: PropositionalLogicVisitor<Result>): Result | null {
        if (visitor.visitXorOperator) {
            return visitor.visitXorOperator(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class NotOperatorContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public NOT(): antlr.TerminalNode {
        return this.getToken(PropositionalLogicParser.NOT, 0)!;
    }
    public override get ruleIndex(): number {
        return PropositionalLogicParser.RULE_notOperator;
    }
    public override enterRule(listener: PropositionalLogicListener): void {
        if(listener.enterNotOperator) {
             listener.enterNotOperator(this);
        }
    }
    public override exitRule(listener: PropositionalLogicListener): void {
        if(listener.exitNotOperator) {
             listener.exitNotOperator(this);
        }
    }
    public override accept<Result>(visitor: PropositionalLogicVisitor<Result>): Result | null {
        if (visitor.visitNotOperator) {
            return visitor.visitNotOperator(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ConditionalAndOperatorContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public AND_ALSO(): antlr.TerminalNode {
        return this.getToken(PropositionalLogicParser.AND_ALSO, 0)!;
    }
    public override get ruleIndex(): number {
        return PropositionalLogicParser.RULE_conditionalAndOperator;
    }
    public override enterRule(listener: PropositionalLogicListener): void {
        if(listener.enterConditionalAndOperator) {
             listener.enterConditionalAndOperator(this);
        }
    }
    public override exitRule(listener: PropositionalLogicListener): void {
        if(listener.exitConditionalAndOperator) {
             listener.exitConditionalAndOperator(this);
        }
    }
    public override accept<Result>(visitor: PropositionalLogicVisitor<Result>): Result | null {
        if (visitor.visitConditionalAndOperator) {
            return visitor.visitConditionalAndOperator(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ConditionalOrOperatorContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public OR_ELSE(): antlr.TerminalNode {
        return this.getToken(PropositionalLogicParser.OR_ELSE, 0)!;
    }
    public override get ruleIndex(): number {
        return PropositionalLogicParser.RULE_conditionalOrOperator;
    }
    public override enterRule(listener: PropositionalLogicListener): void {
        if(listener.enterConditionalOrOperator) {
             listener.enterConditionalOrOperator(this);
        }
    }
    public override exitRule(listener: PropositionalLogicListener): void {
        if(listener.exitConditionalOrOperator) {
             listener.exitConditionalOrOperator(this);
        }
    }
    public override accept<Result>(visitor: PropositionalLogicVisitor<Result>): Result | null {
        if (visitor.visitConditionalOrOperator) {
            return visitor.visitConditionalOrOperator(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class LeftParenthesisContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(PropositionalLogicParser.LPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return PropositionalLogicParser.RULE_leftParenthesis;
    }
    public override enterRule(listener: PropositionalLogicListener): void {
        if(listener.enterLeftParenthesis) {
             listener.enterLeftParenthesis(this);
        }
    }
    public override exitRule(listener: PropositionalLogicListener): void {
        if(listener.exitLeftParenthesis) {
             listener.exitLeftParenthesis(this);
        }
    }
    public override accept<Result>(visitor: PropositionalLogicVisitor<Result>): Result | null {
        if (visitor.visitLeftParenthesis) {
            return visitor.visitLeftParenthesis(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class RightParenthesisContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(PropositionalLogicParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return PropositionalLogicParser.RULE_rightParenthesis;
    }
    public override enterRule(listener: PropositionalLogicListener): void {
        if(listener.enterRightParenthesis) {
             listener.enterRightParenthesis(this);
        }
    }
    public override exitRule(listener: PropositionalLogicListener): void {
        if(listener.exitRightParenthesis) {
             listener.exitRightParenthesis(this);
        }
    }
    public override accept<Result>(visitor: PropositionalLogicVisitor<Result>): Result | null {
        if (visitor.visitRightParenthesis) {
            return visitor.visitRightParenthesis(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PropositionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PROPOSITION(): antlr.TerminalNode {
        return this.getToken(PropositionalLogicParser.PROPOSITION, 0)!;
    }
    public override get ruleIndex(): number {
        return PropositionalLogicParser.RULE_proposition;
    }
    public override enterRule(listener: PropositionalLogicListener): void {
        if(listener.enterProposition) {
             listener.enterProposition(this);
        }
    }
    public override exitRule(listener: PropositionalLogicListener): void {
        if(listener.exitProposition) {
             listener.exitProposition(this);
        }
    }
    public override accept<Result>(visitor: PropositionalLogicVisitor<Result>): Result | null {
        if (visitor.visitProposition) {
            return visitor.visitProposition(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
