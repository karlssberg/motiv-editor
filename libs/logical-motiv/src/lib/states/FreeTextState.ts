import {
  $createPoint,
  $getSelection,
  $isRangeSelection,
  LexicalEditor,
} from 'lexical';
import SuggestionsState from './SuggestionsState';
import { TextPointType } from 'lexical/LexicalSelection';
import { State, StateContext } from './State';
import { Suggestion } from '../parser';
import {
  HIGHLIGHT_SUGGESTION_COMMAND,
  SHOW_SUGGESTIONS_COMMAND,
} from '../commands';

export default class FreeTextState implements State {
  readonly type = 'FreeTextState';

  constructor(
    private readonly editor: LexicalEditor,
    private readonly setNextState: (state: State) => void
  ) {}

  chooseSuggestion(suggestion: Suggestion): boolean {
    return false;
  }

  setSuggestions(suggestions: Suggestion[]): void {
    return;
  }

  getSearchText(): string {
    return '';
  }

  arrowLeftHandler(event: KeyboardEvent): boolean {
    return false;
  }

  arrowRightHandler(event: KeyboardEvent): boolean {
    return false;
  }

  arrowDownHandler(): boolean {
    return false;
  }

  arrowUpHandler(): boolean {
    return false;
  }

  keyDownHandler(event: KeyboardEvent): boolean {
    const key = event.key;

    const isSpecialChar = event.altKey || event.ctrlKey || event.metaKey;
    const isForceSuggestions = event.key === ' ' && event.ctrlKey;
    const isSingleChar = key.match(/^(\w|\s)$/) !== null;

    if ((isSpecialChar && !isForceSuggestions) || !isSingleChar) return false;

    this.editor.dispatchCommand(HIGHLIGHT_SUGGESTION_COMMAND, null);
    this.editor.dispatchCommand(SHOW_SUGGESTIONS_COMMAND, true);

    setTimeout(
      () =>
        this.editor.update(() => {
          const selection = $getSelection();
          if (!$isRangeSelection(selection)) {
            console.error('Expected range selection');
            return;
          }

          const points = selection.getStartEndPoints();
          if (!points) {
            console.error('Expected start and end points');
            return;
          }

          const isWhitespace = key.match(/\s/);
          const [start] = points;
          const adjustedStart =
            start.type === 'text'
              ? ($createPoint(
                  start.key,
                  Math.max(0, start.offset - 1) + (isWhitespace ? 1 : 0),
                  'text'
                ) as TextPointType)
              : start;

          const suggestionsState = new SuggestionsState(
            this.editor,
            this.setNextState,
            adjustedStart
          );
          this.setNextState(suggestionsState);
          suggestionsState.keyDownHandler(event);
        }),
      0
    );

    return false;
  }

  enterKeyHandler(): boolean {
    return false;
  }

  escapeKeyHandler(): boolean {
    return false;
  }

  backspaceHandler(event: KeyboardEvent): boolean {
    return false;
  }
  deleteHandler(event: KeyboardEvent): boolean {
    return false;
  }

  selectionChangeHandler(): void {
    return;
  }

  documentClickHandler(event: Event): void {}

  suggestionVisible = false;
}
