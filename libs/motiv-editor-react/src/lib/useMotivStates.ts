import { Suggestion } from './Suggestion';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Signal, useComputed, useSignal } from '@preact/signals-react';
import FreeTextState from './motiv-lexical/states/FreeTextState';
import { useCallback, useEffect, useMemo, useState } from 'react';
import AutoSuggester from './motiv-lexical/parser/AutoSuggester';
import { mergeRegister } from '@lexical/utils';
import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_NORMAL,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import SuggestionsState from './motiv-lexical/states/SuggestionsState';
import { Proposition } from './Proposition';
import { State } from './motiv-lexical';

export interface StateContext {
  setSelectedSuggestion: (suggestion: Suggestion | null) => void;
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

export function useMotivStates(propositionSuggestions: Proposition[]) {
  const [editor] = useLexicalComposerContext();
  const [selectedSuggestion, setSelectedSuggestion] =
    useState<Suggestion | null>(null);
  const autoSuggester = useMemo(
    () => new AutoSuggester(propositionSuggestions),
    [propositionSuggestions]
  );
  const [suggestions, setSuggestions] = useState<Suggestion[]>(nullSuggestions);
  const initialFreeTextState = useMemo(
    () =>
      new FreeTextState(editor, setNextState, {
        setSelectedSuggestion: (suggestion) =>
          setSelectedSuggestion(suggestion),
      }),
    [editor, suggestions]
  );

  const [state, setState] = useState<State>(initialFreeTextState);

  function setNextState(nextState: State) {
    setState(nextState);
  }

  useEffect(() => {
    state.setSuggestions(suggestions);
  }, [state, suggestions]);

  const updateSuggestions = useCallback(() => {
    const editorText = editor.getRootElement()?.textContent;

    editor.getEditorState().read(() => {
      const globalOffset = getSourceCodeCaretPosition();
      if (globalOffset === null) {
        console.log('Global offset is null');
        return;
      }

      const searchCriteria =
        state instanceof SuggestionsState ? state.getSearchText() : '';

      const newSuggestions = autoSuggester.getSuggestions(
        editorText ?? '',
        globalOffset,
        searchCriteria
      );
      setSuggestions(newSuggestions);
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
    selectedSuggestion,
    setSelectedSuggestion,
    suggestions,
    setSuggestions,
  };
}
