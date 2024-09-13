import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AutoSuggester,
  FreeTextState,
  SuggestionsState,
  State,
  Proposition,
  Suggestion,
} from './motiv-lexical';
import { mergeRegister } from '@lexical/utils';
import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_NORMAL,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';

export interface StateContext {
  setSelectedSuggestion: (suggestion: Suggestion | null) => void;
}

const nullSuggestions: Suggestion[] = [];

export function useMotivStates(propositionSuggestions: Proposition[]) {
  const [editor] = useLexicalComposerContext();
  const [selectedSuggestion, setSelectedSuggestion] =
    useState<Suggestion | null>(null);
  const initialFreeTextState = useMemo(
    () =>
      new FreeTextState(editor, setNextState, {
        setSelectedSuggestion: (suggestion) =>
          setSelectedSuggestion(suggestion),
      }),
    [editor]
  );

  const [state, setState] = useState<State>(initialFreeTextState);

  function setNextState(nextState: State) {
    setState(nextState);
  }

  // useEffect(() => {
  //   state.setSuggestions(suggestions);
  // }, [state, suggestions]);

  return {
    state,
    selectedSuggestion,
    setSelectedSuggestion,
  };
}
