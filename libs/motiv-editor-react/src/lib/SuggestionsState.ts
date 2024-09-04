﻿import {
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  LexicalEditor,
  TextNode,
  $createPoint,
  RangeSelection,
  $getRoot,
  ElementNode,
} from 'lexical';
import { Suggestion } from './Suggestion';
import FreeTextState from './FreeTextState';
import { State, StateContext } from './useMotivStates';
import { $createUnrecognizedNode } from './nodes/UnrecognizedNode';
import { PointType, TextPointType } from 'lexical/LexicalSelection';

export default class SuggestionsState implements State {
  readonly type = 'SuggestionsState';
  private searchText = '';

  constructor(
    private readonly editor: LexicalEditor,
    private readonly setNextState: (state: State) => void,
    private readonly context: StateContext,
    private startPoint: PointType
  ) {
    this.editor = editor;
  }

  arrowLeftHandler(event: KeyboardEvent): boolean {
    this.context.selectedIndex.value = 0;

    this.setFreeTextState();
    return false;
  }
  arrowRightHandler(event: KeyboardEvent): boolean {
    this.context.selectedIndex.value = 0;

    this.setFreeTextState();
    return false;
  }

  arrowDownHandler(event: KeyboardEvent): boolean {
    this.context.selectedIndex.value =
      (this.context.selectedIndex.value + 1) %
      this.context.suggestions.value.length;

    event.preventDefault();
    return true;
  }

  arrowUpHandler(event: KeyboardEvent): boolean {
    this.context.selectedIndex.value =
      (this.context.selectedIndex.value -
        1 +
        this.context.suggestions.value.length) %
      this.context.suggestions.value.length;

    event.preventDefault();
    return true;
  }

  keyDownHandler(event: KeyboardEvent): boolean {
    const isSpecialChar = event.altKey || event.ctrlKey || event.metaKey;
    if (isSpecialChar) return false;
    if (event.key.match(/^(\w|\s)$/) === null) return false;

    if (!(event.key === ' ' && this.searchText.length === 0)) {
      this.searchText += event.key;
    }

    return false;
  }
  getSearchText(): string {
    return this.searchText;
  }

  private setFreeTextState() {
    this.setNextState(
      new FreeTextState(this.editor, this.setNextState, this.context)
    );
  }

  enterKeyHandler(event: KeyboardEvent | null): boolean {
    event?.preventDefault();
    const context = this.context;
    return this.handleSuggestionSelection(
      context.suggestions.value[context.selectedIndex.value]
    );
  }

  escapeKeyHandler(event: KeyboardEvent): boolean {
    this.context.selectedIndex.value = 0;

    this.setFreeTextState();
    return false;
  }

  clickHandler(
    event: MouseEvent,
    suggestion: Suggestion,
    selectedIndex: number
  ): boolean {
    event.preventDefault();
    return this.handleSuggestionSelection(
      this.context.suggestions.value[selectedIndex]
    );
  }

  private createStartPoint() {
    const node = $createUnrecognizedNode('');
    const selection = $getSelection();
    if (!selection) {
      throw new Error('Expected selection');
    }
    selection.insertNodes([node]);
    const point = $createPoint(node.getKey(), 0, 'text') as TextPointType;
    return point;
  }

  private handleSuggestionSelection(suggestion: Suggestion): boolean {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) {
      console.error('Expected range selection');
      this.setFreeTextState();
      return false;
    }
    const points = selection.getStartEndPoints();
    if (!points) {
      console.info('Expected start and end points');
      this.setFreeTextState();
      return false;
    }

    this.insertText(selection, suggestion);

    this.setFreeTextState();
    return true;
  }

  private insertText(selection: RangeSelection, suggestion: Suggestion) {
    if (this.startPoint.type === 'element') {
      const node = $createUnrecognizedNode(suggestion.value);
      node.selectEnd();
      this.startPoint.getNode().append(node);
      return;
    }
    this.ensureStartNodeIsValid();
    const startPoint = this.startPoint;

    const startNode = startPoint.getNode();
    const [, end] = selection.getStartEndPoints() ?? [null, startPoint];
    const endNode =
      end?.type === 'text' ? (end.getNode() as TextNode) : startNode;

    const nodeText = endNode.getTextContent();
    const overlappingText = findSuffixPrefixOverlap(nodeText, suggestion.value);

    const textOffset = overlappingText.length || this.getSearchText().length;

    if (end.key === startPoint.key) {
      selection.setTextNodeRange(
        endNode,
        end.offset - textOffset,
        endNode,
        end.offset
      );
    }

    selection.insertText(suggestion.value);
  }

  backspaceHandler(event: KeyboardEvent): boolean {
    if (this.searchText.length === 0) {
      this.setFreeTextState();
      return false;
    }
    this.searchText = this.searchText.slice(0, -1);
    return false;
  }
  deleteHandler(event: KeyboardEvent): boolean {
    return false;
  }

  documentClickHandler() {
    this.context.selectedIndex.value = 0;
    this.setFreeTextState();
  }

  suggestionVisible = true;

  private ensureStartNodeIsValid(): void {
    if ($getNodeByKey(this.startPoint.key) === null) {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) {
        throw new Error('Expected range selection');
      }

      const points = selection.getStartEndPoints();
      if (!points) {
        throw new Error('Expected start and end points');
      }
      const [start] = points;
      if (start.type === 'text') {
        this.startPoint = start;
        return;
      }

      const newStartPoint = this.createStartPoint();
      this.startPoint = newStartPoint;
    }
  }
}

function findSuffixPrefixOverlap(
  suffixCandidate: string,
  prefixCandidate: string
): string {
  const maxIterations = Math.min(
    prefixCandidate.length,
    suffixCandidate.length
  );
  for (let i = 0; i < maxIterations; i++) {
    const previousTextSuffix = suffixCandidate.slice(-1 * (i + 1));
    const suggestionPrefix = prefixCandidate.slice(0, i + 1);
    if (previousTextSuffix === suggestionPrefix) {
      return suggestionPrefix;
    }
  }
  return '';
}
