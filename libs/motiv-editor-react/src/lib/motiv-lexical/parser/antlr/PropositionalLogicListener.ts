// Generated from PropositionalLogic.g4 by ANTLR 4.13.1

import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";


import { FormulaContext } from "./PropositionalLogicParser.js";
import { ExpressionContext } from "./PropositionalLogicParser.js";
import { ConditionalOrExpressionContext } from "./PropositionalLogicParser.js";
import { ConditionalAndExpressionContext } from "./PropositionalLogicParser.js";
import { OrExpressionContext } from "./PropositionalLogicParser.js";
import { XorExpressionContext } from "./PropositionalLogicParser.js";
import { AndExpressionContext } from "./PropositionalLogicParser.js";
import { NotExpressionContext } from "./PropositionalLogicParser.js";
import { PropositionContext } from "./PropositionalLogicParser.js";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `PropositionalLogicParser`.
 */
export class PropositionalLogicListener implements ParseTreeListener {
    /**
     * Enter a parse tree produced by `PropositionalLogicParser.formula`.
     * @param ctx the parse tree
     */
    enterFormula?: (ctx: FormulaContext) => void;
    /**
     * Exit a parse tree produced by `PropositionalLogicParser.formula`.
     * @param ctx the parse tree
     */
    exitFormula?: (ctx: FormulaContext) => void;
    /**
     * Enter a parse tree produced by `PropositionalLogicParser.expression`.
     * @param ctx the parse tree
     */
    enterExpression?: (ctx: ExpressionContext) => void;
    /**
     * Exit a parse tree produced by `PropositionalLogicParser.expression`.
     * @param ctx the parse tree
     */
    exitExpression?: (ctx: ExpressionContext) => void;
    /**
     * Enter a parse tree produced by `PropositionalLogicParser.conditionalOrExpression`.
     * @param ctx the parse tree
     */
    enterConditionalOrExpression?: (ctx: ConditionalOrExpressionContext) => void;
    /**
     * Exit a parse tree produced by `PropositionalLogicParser.conditionalOrExpression`.
     * @param ctx the parse tree
     */
    exitConditionalOrExpression?: (ctx: ConditionalOrExpressionContext) => void;
    /**
     * Enter a parse tree produced by `PropositionalLogicParser.conditionalAndExpression`.
     * @param ctx the parse tree
     */
    enterConditionalAndExpression?: (ctx: ConditionalAndExpressionContext) => void;
    /**
     * Exit a parse tree produced by `PropositionalLogicParser.conditionalAndExpression`.
     * @param ctx the parse tree
     */
    exitConditionalAndExpression?: (ctx: ConditionalAndExpressionContext) => void;
    /**
     * Enter a parse tree produced by `PropositionalLogicParser.orExpression`.
     * @param ctx the parse tree
     */
    enterOrExpression?: (ctx: OrExpressionContext) => void;
    /**
     * Exit a parse tree produced by `PropositionalLogicParser.orExpression`.
     * @param ctx the parse tree
     */
    exitOrExpression?: (ctx: OrExpressionContext) => void;
    /**
     * Enter a parse tree produced by `PropositionalLogicParser.xorExpression`.
     * @param ctx the parse tree
     */
    enterXorExpression?: (ctx: XorExpressionContext) => void;
    /**
     * Exit a parse tree produced by `PropositionalLogicParser.xorExpression`.
     * @param ctx the parse tree
     */
    exitXorExpression?: (ctx: XorExpressionContext) => void;
    /**
     * Enter a parse tree produced by `PropositionalLogicParser.andExpression`.
     * @param ctx the parse tree
     */
    enterAndExpression?: (ctx: AndExpressionContext) => void;
    /**
     * Exit a parse tree produced by `PropositionalLogicParser.andExpression`.
     * @param ctx the parse tree
     */
    exitAndExpression?: (ctx: AndExpressionContext) => void;
    /**
     * Enter a parse tree produced by `PropositionalLogicParser.notExpression`.
     * @param ctx the parse tree
     */
    enterNotExpression?: (ctx: NotExpressionContext) => void;
    /**
     * Exit a parse tree produced by `PropositionalLogicParser.notExpression`.
     * @param ctx the parse tree
     */
    exitNotExpression?: (ctx: NotExpressionContext) => void;
    /**
     * Enter a parse tree produced by `PropositionalLogicParser.proposition`.
     * @param ctx the parse tree
     */
    enterProposition?: (ctx: PropositionContext) => void;
    /**
     * Exit a parse tree produced by `PropositionalLogicParser.proposition`.
     * @param ctx the parse tree
     */
    exitProposition?: (ctx: PropositionContext) => void;

    visitTerminal(node: TerminalNode): void {}
    visitErrorNode(node: ErrorNode): void {}
    enterEveryRule(node: ParserRuleContext): void {}
    exitEveryRule(node: ParserRuleContext): void {}
}

