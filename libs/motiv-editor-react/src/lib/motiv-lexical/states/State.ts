import { Suggestion } from '../../Suggestion';

export interface State {
  readonly type: string;
  arrowDownHandler(event: KeyboardEvent): boolean;
  arrowUpHandler(event: KeyboardEvent): boolean;
  keyDownHandler(event: KeyboardEvent): boolean;
  enterKeyHandler(event: KeyboardEvent | null): boolean;
  escapeKeyHandler(event: KeyboardEvent): boolean;
  arrowLeftHandler(event: KeyboardEvent): boolean;
  arrowRightHandler(event: KeyboardEvent): boolean;
  backspaceHandler(event: KeyboardEvent): boolean;
  deleteHandler(event: KeyboardEvent): boolean;
  clickHandler(event: MouseEvent, suggestion: Suggestion): boolean;
  documentClickHandler(event: Event): void;
  suggestionVisible: boolean;
  getSearchText(): string;
  setSuggestions(suggestions: Suggestion[]): void;
}
