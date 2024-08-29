import {
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  LexicalEditor,
  TextNode,
  $createPoint,
  RangeSelection,
  $getRoot,
} from 'lexical';
import { Suggestion } from './Suggestion';
import FreeTextState from './FreeTextState';
import { State, StateContext } from './useMotivStates';
import { $createUnrecognizedNode } from './nodes/UnrecognizedNode';
import { TextPointType } from 'lexical/LexicalSelection';

export default class SuggestionsState implements State {
  readonly type = 'SuggestionsState';

  constructor(
    private readonly editor: LexicalEditor,
    private readonly setNextState: (state: State) => void,
    private readonly context: StateContext,
    private startPoint: TextPointType
  ) {
    this.editor = editor;
  }

  arrowLeftHandler(event: KeyboardEvent): boolean {
    this.ensureStartNodeIsValid();
    this.context.selectedIndex.value = 0;

    this.setFreeTextState();
    return false;
  }
  arrowRightHandler(event: KeyboardEvent): boolean {
    this.ensureStartNodeIsValid();
    this.context.selectedIndex.value = 0;

    this.setFreeTextState();
    return false;
  }

  arrowDownHandler(event: KeyboardEvent): boolean {
    this.ensureStartNodeIsValid();
    this.context.selectedIndex.value =
      (this.context.selectedIndex.value + 1) %
      this.context.suggestions.value.length;

    event.preventDefault();
    return true;
  }

  arrowUpHandler(event: KeyboardEvent): boolean {
    this.ensureStartNodeIsValid();
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

    const initialSelection = $getSelection();
    if (!$isRangeSelection(initialSelection)) {
      console.error('Expected range selection');
      this.setFreeTextState();
      return false;
    }

    const points = initialSelection.getStartEndPoints();
    if (!points) {
      console.error('Expected start and end points');
      this.setFreeTextState();
      return false;
    }

    if (!$isRangeSelection(initialSelection)) {
      console.error('Expected range selection');
      this.setFreeTextState();
      return false;
    }

    const initialEnd = points[1];
    const initialEndNode = initialEnd.getNode();

    if (!$isTextNode(initialEndNode)) {
      console.error('Expected start and end of selections to be text nodes');
      return false;
    }

    initialSelection.setTextNodeRange(
      initialEndNode,
      initialEnd.offset,
      initialEndNode,
      initialEnd.offset
    );

    return false;
  }
  getSearchCriteria(): string {
    const startNode = $getNodeByKey(this.startPoint.key);
    if (!startNode) return '';
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) return '';
    if (selection.focus.type !== 'text') return '';

    const text = startNode.getTextContent();
    const slicedText = text.slice(
      this.startPoint.offset,
      selection.focus.offset
    );
    return slicedText;
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
    $getSelection()?.insertNodes([node]);
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

    return true;
  }

  private insertText(selection: RangeSelection, suggestion: Suggestion) {
    this.ensureStartNodeIsValid();
    const startNode = this.startPoint.getNode();
    const [, end] = selection.getStartEndPoints() ?? [null, this.startPoint];
    const endNode =
      end?.type === 'text' ? (end.getNode() as TextNode) : startNode;

    const nodeText = endNode.getTextContent();
    const overlappingText = findSuffixPrefixOverlap(nodeText, suggestion.value);

    const textOffset =
      overlappingText.length || this.getSearchCriteria().length;

    if (end.key === this.startPoint.key) {
      selection.setTextNodeRange(
        endNode,
        end.offset - textOffset,
        endNode,
        end.offset
      );
    }

    selection.insertText(suggestion.value);
    this.context.selectedIndex.value = 0;
  }

  backspaceHandler(event: KeyboardEvent): boolean {
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
        return;
      }

      const points = selection.getStartEndPoints();
      if (!points) {
        return;
      }
      const [start] = points;
      if (start.key === this.startPoint.key && start.type === 'text') {
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
