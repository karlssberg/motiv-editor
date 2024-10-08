// Generated from PropositionalLogic.g4 by ANTLR 4.13.1

import { AbstractParseTreeVisitor } from 'antlr4ng';

import { FormulaContext } from './PropositionalLogicParser';
import { ExpressionContext } from './PropositionalLogicParser';
import { ConditionalOrExpressionContext } from './PropositionalLogicParser';
import { ConditionalAndExpressionContext } from './PropositionalLogicParser';
import { OrExpressionContext } from './PropositionalLogicParser';
import { XorExpressionContext } from './PropositionalLogicParser';
import { AndExpressionContext } from './PropositionalLogicParser';
import { NotExpressionContext } from './PropositionalLogicParser';
import { AndOperatorContext } from './PropositionalLogicParser';
import { OrOperatorContext } from './PropositionalLogicParser';
import { XorOperatorContext } from './PropositionalLogicParser';
import { NotOperatorContext } from './PropositionalLogicParser';
import { ConditionalAndOperatorContext } from './PropositionalLogicParser';
import { ConditionalOrOperatorContext } from './PropositionalLogicParser';
import { LeftParenthesisContext } from './PropositionalLogicParser';
import { RightParenthesisContext } from './PropositionalLogicParser';
import { PropositionContext } from './PropositionalLogicParser';

/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `PropositionalLogicParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export class PropositionalLogicVisitor<
  Result
> extends AbstractParseTreeVisitor<Result> {
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
  visitConditionalOrExpression?: (
    ctx: ConditionalOrExpressionContext
  ) => Result;
  /**
   * Visit a parse tree produced by `PropositionalLogicParser.conditionalAndExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConditionalAndExpression?: (
    ctx: ConditionalAndExpressionContext
  ) => Result;
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
   * Visit a parse tree produced by `PropositionalLogicParser.andOperator`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAndOperator?: (ctx: AndOperatorContext) => Result;
  /**
   * Visit a parse tree produced by `PropositionalLogicParser.orOperator`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitOrOperator?: (ctx: OrOperatorContext) => Result;
  /**
   * Visit a parse tree produced by `PropositionalLogicParser.xorOperator`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitXorOperator?: (ctx: XorOperatorContext) => Result;
  /**
   * Visit a parse tree produced by `PropositionalLogicParser.notOperator`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNotOperator?: (ctx: NotOperatorContext) => Result;
  /**
   * Visit a parse tree produced by `PropositionalLogicParser.conditionalAndOperator`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConditionalAndOperator?: (ctx: ConditionalAndOperatorContext) => Result;
  /**
   * Visit a parse tree produced by `PropositionalLogicParser.conditionalOrOperator`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConditionalOrOperator?: (ctx: ConditionalOrOperatorContext) => Result;
  /**
   * Visit a parse tree produced by `PropositionalLogicParser.leftParenthesis`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLeftParenthesis?: (ctx: LeftParenthesisContext) => Result;
  /**
   * Visit a parse tree produced by `PropositionalLogicParser.rightParenthesis`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRightParenthesis?: (ctx: RightParenthesisContext) => Result;
  /**
   * Visit a parse tree produced by `PropositionalLogicParser.proposition`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitProposition?: (ctx: PropositionContext) => Result;
}
