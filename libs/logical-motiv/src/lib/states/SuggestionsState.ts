import {
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  LexicalEditor,
  TextNode,
  $createPoint,
  RangeSelection,
} from 'lexical';
import { Suggestion } from '../parser';
import FreeTextState from './FreeTextState';
import {
  $createUnrecognizedNode,
  SHOW_SUGGESTIONS_COMMAND,
  State,
} from '../index';
import { PointType, TextPointType } from 'lexical/LexicalSelection';
import { HIGHLIGHT_SUGGESTION_COMMAND } from '../commands';

export default class SuggestionsState implements State {
  readonly type = 'SuggestionsState';
  private searchText = '';
  private suggestions: Suggestion[] = [];
  private highlightedSuggestion: Suggestion | null = null;
  private suggestionsRemainVisibleAfterTokens = ['(', '!'];

  constructor(
    private readonly editor: LexicalEditor,
    private readonly setNextState: (state: State) => void,
    private startPoint: PointType
  ) {
    this.editor = editor;
  }

  setSuggestions(suggestions: Suggestion[]): void {
    if (suggestions.length === 0) {
      this.setFreeTextState();
      return;
    }
    if (this.highlightedSuggestion == null) {
      this.setSelectedSuggestion(suggestions[0]);
    }
    if (
      !suggestions.some(
        (suggestion) => suggestion.value === this.highlightedSuggestion?.value
      )
    ) {
      this.highlightedSuggestion = null;
    }
    this.suggestions = suggestions;
  }

  arrowLeftHandler(event: KeyboardEvent): boolean {
    this.editor.dispatchCommand(HIGHLIGHT_SUGGESTION_COMMAND, null);

    this.setFreeTextState();
    return false;
  }

  arrowRightHandler(event: KeyboardEvent): boolean {
    this.editor.dispatchCommand(HIGHLIGHT_SUGGESTION_COMMAND, null);

    this.setFreeTextState();
    return false;
  }

  arrowDownHandler(event: KeyboardEvent): boolean {
    if (!this.highlightedSuggestion) {
      this.setSelectedSuggestion(this.suggestions[0]);
      event.preventDefault();
      return true;
    }

    for (let i = 0; i < this.suggestions.length; i++) {
      if (this.highlightedSuggestion?.value === this.suggestions[i].value) {
        const nextIndex = (i + 1) % this.suggestions.length;
        this.setSelectedSuggestion(this.suggestions[nextIndex]);
        break;
      }
    }

    event.preventDefault();
    return true;
  }

  arrowUpHandler(event: KeyboardEvent): boolean {
    if (!this.highlightedSuggestion) {
      this.setSelectedSuggestion(this.suggestions[this.suggestions.length - 1]);
      event.preventDefault();
      return true;
    }
    for (let i = 0; i < this.suggestions.length; i++) {
      if (this.highlightedSuggestion?.value === this.suggestions[i].value) {
        const prevIndex =
          (i - 1 + this.suggestions.length) % this.suggestions.length;
        this.setSelectedSuggestion(this.suggestions[prevIndex]);
        break;
      }
    }

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
    this.setNextState(new FreeTextState(this.editor, this.setNextState));
    this.editor.dispatchCommand(SHOW_SUGGESTIONS_COMMAND, false);
  }

  enterKeyHandler(event: KeyboardEvent | null): boolean {
    event?.preventDefault();
    if (!this.highlightedSuggestion) {
      this.setFreeTextState();
      return true;
    }

    return this.chooseSuggestion(this.highlightedSuggestion);
  }

  escapeKeyHandler(event: KeyboardEvent): boolean {
    this.editor.dispatchCommand(HIGHLIGHT_SUGGESTION_COMMAND, null);

    this.setFreeTextState();
    return false;
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

  chooseSuggestion(suggestion: Suggestion): boolean {
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

    if (!this.suggestionsRemainVisibleAfterTokens.includes(suggestion.value)) {
      this.setFreeTextState();
    }

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
    if (this.searchText.length === 0) {
      this.setFreeTextState();
      return false;
    }
    this.searchText = this.searchText.slice(0, -1);
    return false;
  }

  selectionChangeHandler(): void {
    const selection = $getSelection();
    if (!selection?.isCollapsed()) {
      this.setFreeTextState();
    }
  }

  documentClickHandler() {
    this.setFreeTextState();
    this.editor.dispatchCommand(HIGHLIGHT_SUGGESTION_COMMAND, null);
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

  private setSelectedSuggestion(suggestion: Suggestion | null) {
    this.highlightedSuggestion = suggestion;

    this.editor.dispatchCommand(HIGHLIGHT_SUGGESTION_COMMAND, suggestion);
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
