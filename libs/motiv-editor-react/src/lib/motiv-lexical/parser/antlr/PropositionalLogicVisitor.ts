// Generated from PropositionalLogic.g4 by ANTLR 4.13.1

import { AbstractParseTreeVisitor } from "antlr4ng";


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
 * This interface defines a complete generic visitor for a parse tree produced
 * by `PropositionalLogicParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export class PropositionalLogicVisitor<Result> extends AbstractParseTreeVisitor<Result> {
    /**
     * Visit a parse tree produced by `PropositionalLogicParser.formula`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFormula?: (ctx: FormulaContext) => Result;
    /**
     * Visit a parse tree produced by `PropositionalLogicParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExpression?: (ctx: ExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `PropositionalLogicParser.conditionalOrExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitConditionalOrExpression?: (ctx: ConditionalOrExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `PropositionalLogicParser.conditionalAndExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitConditionalAndExpression?: (ctx: ConditionalAndExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `PropositionalLogicParser.orExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitOrExpression?: (ctx: OrExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `PropositionalLogicParser.xorExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitXorExpression?: (ctx: XorExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `PropositionalLogicParser.andExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAndExpression?: (ctx: AndExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `PropositionalLogicParser.notExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitNotExpression?: (ctx: NotExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `PropositionalLogicParser.proposition`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProposition?: (ctx: PropositionContext) => Result;
}

