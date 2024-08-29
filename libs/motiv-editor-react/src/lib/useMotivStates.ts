import { Suggestion } from './Suggestion';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Signal, useComputed, useSignal } from '@preact/signals-react';
import FreeTextState from './FreeTextState';
import { useCallback, useEffect, useMemo } from 'react';
import AutoSuggester from './AutoSuggester';
import { mergeRegister } from '@lexical/utils';
import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_NORMAL,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { debounce } from 'next/dist/server/utils';
import { getSyntax, HighlightToken } from './syntaxAnalyzer';
import SuggestionsState from './SuggestionsState';

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
  clickHandler(
    event: MouseEvent,
    suggestion: Suggestion,
    selectedIndex: number
  ): boolean;
  documentClickHandler(event: Event): void;
  suggestionVisible: boolean;
  getSearchCriteria(): string;
}

export interface StateContext {
  selectedIndex: Signal<number>;
  suggestions: Signal<Suggestion[]>;
}
const nullSuggestions: Suggestion[] = [];

function getSourceCodeCaretPosition(): number | null {
  const selection = $getSelection();
  if (!$isRangeSelection(selection)) {
    return null; // Return null for non-range selections
  }

  const anchor = selection.anchor;
  const anchorNode = anchor.getNode();
  const anchorOffset = anchor.offset;

  let globalOffset = 0;
  const root = $getRoot();

  // Traverse the editor content
  root.getAllTextNodes().some((node) => {
    if (node === anchorNode) {
      globalOffset += anchorOffset;
      return true; // Stop the traversal
    }
    globalOffset += node.getTextContent().length;
    return false; // Continue the traversal
  });

  return globalOffset;
}

export function useMotivStates(atomSuggestions: Signal<Suggestion[]>) {
  const [editor] = useLexicalComposerContext();
  const selectedIndex = useSignal(0);
  const autoSuggester = useComputed(
    () => new AutoSuggester(atomSuggestions.value)
  );
  const suggestions = useSignal<Suggestion[]>(nullSuggestions);
  const initialFreeTextState = useMemo(
    () =>
      new FreeTextState(editor, setNextState, {
        selectedIndex,
        suggestions,
      }),
    [editor]
  );

  const state = useSignal<State>(initialFreeTextState);

  function setNextState(nextState: State) {
    state.value = nextState;
  }

  const updateSuggestions = useCallback(() => {
    const editorText = editor.getRootElement()?.textContent;
    if (!editorText) {
      console.log('Editor text is empty');
      return;
    }
    editor.getEditorState().read(() => {
      const globalOffset = getSourceCodeCaretPosition();
      if (globalOffset === null) {
        console.log('Global offset is null');
        return;
      }

      const searchCriteria =
        state.value instanceof SuggestionsState
          ? state.value.getSearchCriteria()
          : '';
      suggestions.value = autoSuggester.value.getSuggestions(
        editorText,
        globalOffset,
        searchCriteria
      );
    });
  }, [editor, autoSuggester, suggestions]);

  useEffect(
    () =>
      mergeRegister(
        editor.registerCommand(
          SELECTION_CHANGE_COMMAND,
          () => {
            updateSuggestions();
            return false;
          },
          COMMAND_PRIORITY_NORMAL
        )
      ),
    [editor, updateSuggestions]
  );

  return {
    state,
    selectedIndex,
    suggestions,
  };
}
