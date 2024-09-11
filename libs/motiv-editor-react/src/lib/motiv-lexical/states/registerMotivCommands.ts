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
  LexicalEditor,
} from 'lexical';
import { mergeRegister } from '@lexical/utils';
import { State } from './State';

export function registerMotivCommands(
  editor: LexicalEditor,
  state: State
): () => void {
  return mergeRegister(
    editor.registerCommand(
      KEY_ARROW_DOWN_COMMAND,
      (event) => state.arrowDownHandler(event),
      COMMAND_PRIORITY_NORMAL
    ),
    editor.registerCommand(
      KEY_ARROW_UP_COMMAND,
      (event) => state.arrowUpHandler(event),
      COMMAND_PRIORITY_NORMAL
    ),
    editor.registerCommand(
      KEY_DOWN_COMMAND,
      (event) => state.keyDownHandler(event),
      COMMAND_PRIORITY_NORMAL
    ),
    editor.registerCommand(
      KEY_ENTER_COMMAND,
      (event) => state.enterKeyHandler(event),
      COMMAND_PRIORITY_NORMAL
    ),
    editor.registerCommand(
      KEY_ESCAPE_COMMAND,
      (event) => state.escapeKeyHandler(event),
      COMMAND_PRIORITY_NORMAL
    ),
    editor.registerCommand(
      KEY_ARROW_LEFT_COMMAND,
      (event) => state.arrowLeftHandler(event),
      COMMAND_PRIORITY_NORMAL
    ),
    editor.registerCommand(
      KEY_ARROW_RIGHT_COMMAND,
      (event) => state.arrowRightHandler(event),
      COMMAND_PRIORITY_NORMAL
    ),
    editor.registerCommand(
      KEY_BACKSPACE_COMMAND,
      (event) => state.backspaceHandler(event),
      COMMAND_PRIORITY_NORMAL
    ),
    editor.registerCommand(
      KEY_DELETE_COMMAND,
      (event) => state.deleteHandler(event),
      COMMAND_PRIORITY_NORMAL
    )
  );
}
