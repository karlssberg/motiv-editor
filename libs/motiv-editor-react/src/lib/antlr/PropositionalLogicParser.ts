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
    public static readonly RULE_formula = 0;
    public static readonly RULE_expression = 1;
    public static readonly RULE_xorExpression = 2;
    public static readonly RULE_orExpression = 3;
    public static readonly RULE_andExpression = 4;
    public static readonly RULE_notExpression = 5;
    public static readonly RULE_proposition = 6;

    public static readonly literalNames = [
        null, null, null, "'&&'", "'||'", "'&'", "'|'", "'!'", "'^'", "'('", 
        "')'", "'{'", "'}'"
    ];

    public static readonly symbolicNames = [
        null, "PROPOSITION", "PRIMITIVE_VALUE", "AND_ALSO", "OR_ELSE", "AND", 
        "OR", "NOT", "XOR", "LPAREN", "RPAREN", "LBRACE", "RBRACE", "IDENTIFIER_SEGMENT", 
        "NUMBER", "QUOTED_STRING", "WS", "IGNORE_WS"
    ];
    public static readonly ruleNames = [
        "formula", "expression", "xorExpression", "orExpression", "andExpression", 
        "notExpression", "proposition",
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
            this.state = 14;
            this.expression();
            this.state = 15;
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
            this.state = 17;
            this.xorExpression();
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
        this.enterRule(localContext, 4, PropositionalLogicParser.RULE_xorExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 19;
            this.orExpression();
            this.state = 26;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 16) {
                {
                {
                this.state = 20;
                this.match(PropositionalLogicParser.WS);
                this.state = 21;
                this.match(PropositionalLogicParser.XOR);
                this.state = 22;
                this.match(PropositionalLogicParser.WS);
                this.state = 23;
                this.orExpression();
                }
                }
                this.state = 28;
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
        this.enterRule(localContext, 6, PropositionalLogicParser.RULE_orExpression);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 29;
            this.andExpression();
            this.state = 36;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 1, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 30;
                    this.match(PropositionalLogicParser.WS);
                    this.state = 31;
                    _la = this.tokenStream.LA(1);
                    if(!(_la === 4 || _la === 6)) {
                    this.errorHandler.recoverInline(this);
                    }
                    else {
                        this.errorHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 32;
                    this.match(PropositionalLogicParser.WS);
                    this.state = 33;
                    this.andExpression();
                    }
                    }
                }
                this.state = 38;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 1, this.context);
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
        this.enterRule(localContext, 8, PropositionalLogicParser.RULE_andExpression);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 39;
            this.notExpression();
            this.state = 46;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 2, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 40;
                    this.match(PropositionalLogicParser.WS);
                    this.state = 41;
                    _la = this.tokenStream.LA(1);
                    if(!(_la === 3 || _la === 5)) {
                    this.errorHandler.recoverInline(this);
                    }
                    else {
                        this.errorHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 42;
                    this.match(PropositionalLogicParser.WS);
                    this.state = 43;
                    this.notExpression();
                    }
                    }
                }
                this.state = 48;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 2, this.context);
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
        this.enterRule(localContext, 10, PropositionalLogicParser.RULE_notExpression);
        try {
            this.state = 56;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case PropositionalLogicParser.NOT:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 49;
                this.match(PropositionalLogicParser.NOT);
                this.state = 50;
                this.notExpression();
                }
                break;
            case PropositionalLogicParser.LPAREN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 51;
                this.match(PropositionalLogicParser.LPAREN);
                this.state = 52;
                this.expression();
                this.state = 53;
                this.match(PropositionalLogicParser.RPAREN);
                }
                break;
            case PropositionalLogicParser.PROPOSITION:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 55;
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
        this.enterRule(localContext, 12, PropositionalLogicParser.RULE_proposition);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 58;
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
        4,1,17,61,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,1,0,1,0,1,0,1,1,1,1,1,2,1,2,1,2,1,2,1,2,5,2,25,8,2,10,2,12,2,28,
        9,2,1,3,1,3,1,3,1,3,1,3,5,3,35,8,3,10,3,12,3,38,9,3,1,4,1,4,1,4,
        1,4,1,4,5,4,45,8,4,10,4,12,4,48,9,4,1,5,1,5,1,5,1,5,1,5,1,5,1,5,
        3,5,57,8,5,1,6,1,6,1,6,0,0,7,0,2,4,6,8,10,12,0,2,2,0,4,4,6,6,2,0,
        3,3,5,5,58,0,14,1,0,0,0,2,17,1,0,0,0,4,19,1,0,0,0,6,29,1,0,0,0,8,
        39,1,0,0,0,10,56,1,0,0,0,12,58,1,0,0,0,14,15,3,2,1,0,15,16,5,0,0,
        1,16,1,1,0,0,0,17,18,3,4,2,0,18,3,1,0,0,0,19,26,3,6,3,0,20,21,5,
        16,0,0,21,22,5,8,0,0,22,23,5,16,0,0,23,25,3,6,3,0,24,20,1,0,0,0,
        25,28,1,0,0,0,26,24,1,0,0,0,26,27,1,0,0,0,27,5,1,0,0,0,28,26,1,0,
        0,0,29,36,3,8,4,0,30,31,5,16,0,0,31,32,7,0,0,0,32,33,5,16,0,0,33,
        35,3,8,4,0,34,30,1,0,0,0,35,38,1,0,0,0,36,34,1,0,0,0,36,37,1,0,0,
        0,37,7,1,0,0,0,38,36,1,0,0,0,39,46,3,10,5,0,40,41,5,16,0,0,41,42,
        7,1,0,0,42,43,5,16,0,0,43,45,3,10,5,0,44,40,1,0,0,0,45,48,1,0,0,
        0,46,44,1,0,0,0,46,47,1,0,0,0,47,9,1,0,0,0,48,46,1,0,0,0,49,50,5,
        7,0,0,50,57,3,10,5,0,51,52,5,9,0,0,52,53,3,2,1,0,53,54,5,10,0,0,
        54,57,1,0,0,0,55,57,3,12,6,0,56,49,1,0,0,0,56,51,1,0,0,0,56,55,1,
        0,0,0,57,11,1,0,0,0,58,59,5,1,0,0,59,13,1,0,0,0,4,26,36,46,56
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
    public xorExpression(): XorExpressionContext {
        return this.getRuleContext(0, XorExpressionContext)!;
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


export class XorExpressionContext extends antlr.ParserRuleContext {
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
    public WS(): antlr.TerminalNode[];
    public WS(i: number): antlr.TerminalNode | null;
    public WS(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(PropositionalLogicParser.WS);
    	} else {
    		return this.getToken(PropositionalLogicParser.WS, i);
    	}
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


export class OrExpressionContext extends antlr.ParserRuleContext {
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
    public WS(): antlr.TerminalNode[];
    public WS(i: number): antlr.TerminalNode | null;
    public WS(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(PropositionalLogicParser.WS);
    	} else {
    		return this.getToken(PropositionalLogicParser.WS, i);
    	}
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
    public WS(): antlr.TerminalNode[];
    public WS(i: number): antlr.TerminalNode | null;
    public WS(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(PropositionalLogicParser.WS);
    	} else {
    		return this.getToken(PropositionalLogicParser.WS, i);
    	}
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
