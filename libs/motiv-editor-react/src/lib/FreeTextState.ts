import {
  $createPoint,
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  $isTextNode,
  LexicalEditor,
} from 'lexical';
import { State, StateContext } from './useMotivStates';
import SuggestionsState from './SuggestionsState';
import { TextPointType } from 'lexical/LexicalSelection';
import { $createUnrecognizedNode } from './nodes/UnrecognizedNode';
import { $isTokenNode } from './nodes/TokenNode';

export default class FreeTextState implements State {
  readonly type = 'FreeTextState';

  constructor(
    private readonly editor: LexicalEditor,
    private readonly setNextState: (state: State) => void,
    private readonly context: StateContext
  ) {}

  getSearchCriteria(): string {
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

    this.context.selectedIndex.value = 0;

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

          const [start, end] = points;
          if ($isTokenNode(start.getNode()) || $isTokenNode(end.getNode()))
            return;

          const isWhitespace = key.match(/\s/);
          const adjustedStart = $createPoint(
            start.key,
            Math.max(0, start.offset - 1) + (isWhitespace ? 1 : 0),
            'text'
          ) as TextPointType;

          this.setNextState(
            new SuggestionsState(
              this.editor,
              this.setNextState,
              this.context,
              adjustedStart
            )
          );
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

  clickHandler(): boolean {
    return false;
  }

  backspaceHandler(event: KeyboardEvent): boolean {
    return false;
  }
  deleteHandler(event: KeyboardEvent): boolean {
    return false;
  }

  documentClickHandler(event: Event): void {}

  suggestionVisible = false;
}
