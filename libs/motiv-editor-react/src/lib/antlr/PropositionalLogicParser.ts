// Generated from PropositionalLogic.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { PropositionalLogicListener } from "./PropositionalLogicListener.js";
import { PropositionalLogicVisitor } from "./PropositionalLogicVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class PropositionalLogicParser extends antlr.Parser {
    public static readonly PROPOSITION = 1;
    public static readonly PARAMETER = 2;
    public static readonly AND_ALSO = 3;
    public static readonly OR_ELSE = 4;
    public static readonly AND = 5;
    public static readonly OR = 6;
    public static readonly NOT = 7;
    public static readonly XOR = 8;
    public static readonly LPAREN = 9;
    public static readonly RPAREN = 10;
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
    public static readonly RULE_proposition = 8;

    public static readonly literalNames = [
        null, null, null, "'&&'", "'||'", "'&'", "'|'", "'!'", "'^'", "'('", 
        "')'"
    ];

    public static readonly symbolicNames = [
        null, "PROPOSITION", "PARAMETER", "AND_ALSO", "OR_ELSE", "AND", 
        "OR", "NOT", "XOR", "LPAREN", "RPAREN", "IDENTIFIER_SEGMENT_START", 
        "IDENTIFIER_SEGMENT", "WS"
    ];
    public static readonly ruleNames = [
        "formula", "expression", "conditionalOrExpression", "conditionalAndExpression", 
        "orExpression", "xorExpression", "andExpression", "notExpression", 
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
            this.state = 18;
            this.expression();
            this.state = 19;
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
            this.state = 21;
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
            this.state = 23;
            this.conditionalAndExpression();
            this.state = 28;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 4) {
                {
                {
                this.state = 24;
                this.match(PropositionalLogicParser.OR_ELSE);
                this.state = 25;
                this.conditionalAndExpression();
                }
                }
                this.state = 30;
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
            this.state = 31;
            this.orExpression();
            this.state = 36;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 3) {
                {
                {
                this.state = 32;
                this.match(PropositionalLogicParser.AND_ALSO);
                this.state = 33;
                this.orExpression();
                }
                }
                this.state = 38;
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
            this.state = 39;
            this.xorExpression();
            this.state = 44;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 6) {
                {
                {
                this.state = 40;
                this.match(PropositionalLogicParser.OR);
                this.state = 41;
                this.xorExpression();
                }
                }
                this.state = 46;
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
            this.state = 47;
            this.andExpression();
            this.state = 52;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 8) {
                {
                {
                this.state = 48;
                this.match(PropositionalLogicParser.XOR);
                this.state = 49;
                this.andExpression();
                }
                }
                this.state = 54;
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
            this.state = 55;
            this.notExpression();
            this.state = 60;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 56;
                this.match(PropositionalLogicParser.AND);
                this.state = 57;
                this.notExpression();
                }
                }
                this.state = 62;
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
            this.state = 70;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case PropositionalLogicParser.NOT:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 63;
                this.match(PropositionalLogicParser.NOT);
                this.state = 64;
                this.notExpression();
                }
                break;
            case PropositionalLogicParser.LPAREN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 65;
                this.match(PropositionalLogicParser.LPAREN);
                this.state = 66;
                this.expression();
                this.state = 67;
                this.match(PropositionalLogicParser.RPAREN);
                }
                break;
            case PropositionalLogicParser.PROPOSITION:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 69;
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
    public proposition(): PropositionContext {
        let localContext = new PropositionContext(this.context, this.state);
        this.enterRule(localContext, 16, PropositionalLogicParser.RULE_proposition);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 72;
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
        4,1,13,75,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,1,0,1,0,1,0,1,1,1,1,1,2,1,2,1,2,5,2,27,8,2,10,
        2,12,2,30,9,2,1,3,1,3,1,3,5,3,35,8,3,10,3,12,3,38,9,3,1,4,1,4,1,
        4,5,4,43,8,4,10,4,12,4,46,9,4,1,5,1,5,1,5,5,5,51,8,5,10,5,12,5,54,
        9,5,1,6,1,6,1,6,5,6,59,8,6,10,6,12,6,62,9,6,1,7,1,7,1,7,1,7,1,7,
        1,7,1,7,3,7,71,8,7,1,8,1,8,1,8,0,0,9,0,2,4,6,8,10,12,14,16,0,0,72,
        0,18,1,0,0,0,2,21,1,0,0,0,4,23,1,0,0,0,6,31,1,0,0,0,8,39,1,0,0,0,
        10,47,1,0,0,0,12,55,1,0,0,0,14,70,1,0,0,0,16,72,1,0,0,0,18,19,3,
        2,1,0,19,20,5,0,0,1,20,1,1,0,0,0,21,22,3,4,2,0,22,3,1,0,0,0,23,28,
        3,6,3,0,24,25,5,4,0,0,25,27,3,6,3,0,26,24,1,0,0,0,27,30,1,0,0,0,
        28,26,1,0,0,0,28,29,1,0,0,0,29,5,1,0,0,0,30,28,1,0,0,0,31,36,3,8,
        4,0,32,33,5,3,0,0,33,35,3,8,4,0,34,32,1,0,0,0,35,38,1,0,0,0,36,34,
        1,0,0,0,36,37,1,0,0,0,37,7,1,0,0,0,38,36,1,0,0,0,39,44,3,10,5,0,
        40,41,5,6,0,0,41,43,3,10,5,0,42,40,1,0,0,0,43,46,1,0,0,0,44,42,1,
        0,0,0,44,45,1,0,0,0,45,9,1,0,0,0,46,44,1,0,0,0,47,52,3,12,6,0,48,
        49,5,8,0,0,49,51,3,12,6,0,50,48,1,0,0,0,51,54,1,0,0,0,52,50,1,0,
        0,0,52,53,1,0,0,0,53,11,1,0,0,0,54,52,1,0,0,0,55,60,3,14,7,0,56,
        57,5,5,0,0,57,59,3,14,7,0,58,56,1,0,0,0,59,62,1,0,0,0,60,58,1,0,
        0,0,60,61,1,0,0,0,61,13,1,0,0,0,62,60,1,0,0,0,63,64,5,7,0,0,64,71,
        3,14,7,0,65,66,5,9,0,0,66,67,3,2,1,0,67,68,5,10,0,0,68,71,1,0,0,
        0,69,71,3,16,8,0,70,63,1,0,0,0,70,65,1,0,0,0,70,69,1,0,0,0,71,15,
        1,0,0,0,72,73,5,1,0,0,73,17,1,0,0,0,6,28,36,44,52,60,70
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
    public OR_ELSE(): antlr.TerminalNode[];
    public OR_ELSE(i: number): antlr.TerminalNode | null;
    public OR_ELSE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(PropositionalLogicParser.OR_ELSE);
    	} else {
    		return this.getToken(PropositionalLogicParser.OR_ELSE, i);
    	}
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
    public AND_ALSO(): antlr.TerminalNode[];
    public AND_ALSO(i: number): antlr.TerminalNode | null;
    public AND_ALSO(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(PropositionalLogicParser.AND_ALSO);
    	} else {
    		return this.getToken(PropositionalLogicParser.AND_ALSO, i);
    	}
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
    public OR(): antlr.TerminalNode[];
    public OR(i: number): antlr.TerminalNode | null;
    public OR(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(PropositionalLogicParser.OR);
    	} else {
    		return this.getToken(PropositionalLogicParser.OR, i);
    	}
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
    public XOR(): antlr.TerminalNode[];
    public XOR(i: number): antlr.TerminalNode | null;
    public XOR(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(PropositionalLogicParser.XOR);
    	} else {
    		return this.getToken(PropositionalLogicParser.XOR, i);
    	}
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
    public AND(): antlr.TerminalNode[];
    public AND(i: number): antlr.TerminalNode | null;
    public AND(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(PropositionalLogicParser.AND);
    	} else {
    		return this.getToken(PropositionalLogicParser.AND, i);
    	}
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
    public NOT(): antlr.TerminalNode | null {
        return this.getToken(PropositionalLogicParser.NOT, 0);
    }
    public notExpression(): NotExpressionContext | null {
        return this.getRuleContext(0, NotExpressionContext);
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(PropositionalLogicParser.LPAREN, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(PropositionalLogicParser.RPAREN, 0);
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
