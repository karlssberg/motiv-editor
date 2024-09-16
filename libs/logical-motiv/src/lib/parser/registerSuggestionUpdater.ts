import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_NORMAL,
  LexicalEditor,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { State, SuggestionsState } from '../states';
import AutoSuggester from './AutoSuggester';
import { Signal } from '../signal';
import { Proposition } from './Proposition';
import {
  SHOW_SUGGESTIONS_COMMAND,
  UPDATE_SUGGESTIONS_COMMAND,
} from '../commands';
import { mergeRegister } from '@lexical/utils';

export function registerSuggestionUpdater(
  editor: LexicalEditor,
  state: Signal<State>,
  propositions: Map<string, Proposition>
): () => void {
  const autoSuggester = new AutoSuggester(Array.from(propositions.values()));
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
        state.value instanceof SuggestionsState
          ? state.value.getSearchText()
          : '';
      const newSuggestions = autoSuggester.getSuggestions(
        editorText ?? '',
        globalOffset,
        searchCriteria
      );
      editor.dispatchCommand(UPDATE_SUGGESTIONS_COMMAND, newSuggestions);
    });
  }

  return mergeRegister(
    editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        updateSuggestions();
        return false;
      },
      COMMAND_PRIORITY_NORMAL
    )
    // editor.registerCommand(
    //   SHOW_SUGGESTIONS_COMMAND,
    //   () => {
    //     updateSuggestions();
    //     return false;
    //   },
    //   COMMAND_PRIORITY_NORMAL
    // )
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
