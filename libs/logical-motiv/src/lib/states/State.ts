import { Suggestion } from '../parser';

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
  documentClickHandler(event: Event): void;
  suggestionVisible: boolean;
  getSearchText(): string;
  setSuggestions(suggestions: Suggestion[]): void;
  chooseSuggestion(suggestion: Suggestion): boolean;
  selectionChangeHandler(): void;
}

export interface StateContext {
  setSelectedSuggestion: (suggestion: Suggestion | null) => void;
}
