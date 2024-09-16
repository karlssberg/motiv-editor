import {
  COMMAND_PRIORITY_NORMAL,
  KEY_ARROW_DOWN_COMMAND,
  KEY_ARROW_LEFT_COMMAND,
  KEY_ARROW_RIGHT_COMMAND,
  KEY_ARROW_UP_COMMAND,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
  KEY_DOWN_COMMAND,
  KEY_ENTER_COMMAND,
  KEY_ESCAPE_COMMAND,
  SELECTION_CHANGE_COMMAND,
  LexicalEditor,
} from 'lexical';
import { mergeRegister } from '@lexical/utils';
import { State } from './State';
import { Signal } from '../signal';
import { CHOOSE_SUGGESTION_COMMAND } from '../commands';

export function registerMotivCommands(
  editor: LexicalEditor,
  state: Signal<State>
): () => void {
  return mergeRegister(
    editor.registerCommand(
      KEY_ARROW_DOWN_COMMAND,
      (event) => state.value.arrowDownHandler(event),
      COMMAND_PRIORITY_NORMAL
    ),
    editor.registerCommand(
      KEY_ARROW_UP_COMMAND,
      (event) => state.value.arrowUpHandler(event),
      COMMAND_PRIORITY_NORMAL
    ),
    editor.registerCommand(
      KEY_DOWN_COMMAND,
      (event) => state.value.keyDownHandler(event),
      COMMAND_PRIORITY_NORMAL
    ),
    editor.registerCommand(
      KEY_ENTER_COMMAND,
      (event) => state.value.enterKeyHandler(event),
      COMMAND_PRIORITY_NORMAL
    ),
    editor.registerCommand(
      KEY_ESCAPE_COMMAND,
      (event) => state.value.escapeKeyHandler(event),
      COMMAND_PRIORITY_NORMAL
    ),
    editor.registerCommand(
      KEY_ARROW_LEFT_COMMAND,
      (event) => state.value.arrowLeftHandler(event),
      COMMAND_PRIORITY_NORMAL
    ),
    editor.registerCommand(
      KEY_ARROW_RIGHT_COMMAND,
      (event) => state.value.arrowRightHandler(event),
      COMMAND_PRIORITY_NORMAL
    ),
    editor.registerCommand(
      KEY_BACKSPACE_COMMAND,
      (event) => state.value.backspaceHandler(event),
      COMMAND_PRIORITY_NORMAL
    ),
    editor.registerCommand(
      KEY_DELETE_COMMAND,
      (event) => state.value.deleteHandler(event),
      COMMAND_PRIORITY_NORMAL
    ),
    editor.registerCommand(
      CHOOSE_SUGGESTION_COMMAND,
      (event) => state.value.chooseSuggestion(event),
      COMMAND_PRIORITY_NORMAL
    ),
    editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        state.value.selectionChangeHandler();
        return false;
      },
      COMMAND_PRIORITY_NORMAL
    )
  );
}
