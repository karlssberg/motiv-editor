import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_NORMAL,
  createCommand,
  LexicalEditor,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { State, SuggestionsState } from '../states';
import AutoSuggester from './AutoSuggester';
import { Proposition } from 'motiv-editor-react';
import { Suggestion } from './Suggestion';

export const UPDATE_SUGGESTIONS_COMMAND = createCommand<Suggestion[]>();

export function registerSuggestionUpdater(
  editor: LexicalEditor,
  state: State,
  propositionSuggestions: Proposition[]
): () => void {
  const autoSuggester = new AutoSuggester(propositionSuggestions);
  function updateSuggestions() {
    const editorText = editor.getRootElement()?.textContent;

    editor.getEditorState().read(() => {
      const globalOffset = getSourceCodeCaretPosition();
      if (globalOffset === null) {
        console.log(
          'Global offset is null, unable to update Motiv editor suggestions dropdown'
        );
        return;
      }

      const searchCriteria =
        state instanceof SuggestionsState ? state.getSearchText() : '';

      const newSuggestions = autoSuggester.getSuggestions(
        editorText ?? '',
        globalOffset,
        searchCriteria
      );
      editor.dispatchCommand(UPDATE_SUGGESTIONS_COMMAND, newSuggestions);
    });
  }

  return editor.registerCommand(
    SELECTION_CHANGE_COMMAND,
    () => {
      updateSuggestions();
      return false;
    },
    COMMAND_PRIORITY_NORMAL
  );
}

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
