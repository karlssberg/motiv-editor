import { registerPlainText } from '@lexical/plain-text';
import {
  FreeTextState,
  registerMotivCommands,
  State,
  SuggestionsState,
} from './states';
import { registerErrorDecorator } from './errors';
import { registerTransformers } from './transformers';
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  LexicalEditor,
  COMMAND_PRIORITY_NORMAL,
  COMMAND_PRIORITY_CRITICAL,
  CLICK_COMMAND,
} from 'lexical';
import { mergeRegister } from '@lexical/utils';
import { Proposition, registerSuggestionUpdater, signal, Suggestion } from './';
import { Signal } from './signal';
import { registerHistory, createEmptyHistoryState } from '@lexical/history';
import { UPDATE_SUGGESTIONS_COMMAND } from './commands';
import { registerAutoSuggestPositionUpdater } from './registerAutoSuggestPositionUpdater';

export interface MotivRegistrationOptions {
  propositions: Proposition[];
  source: string;
  dropdownElement?: HTMLElement;
}

export function registerMotivEditor(
  editor: LexicalEditor,
  { source, propositions, dropdownElement }: MotivRegistrationOptions
): () => void {
  setSource(editor, source);
  const dropdownDisplayType = dropdownElement?.style.display;

  const state = signal<State>(undefined!);
  state.value = createDefaultState(editor, state);

  const propositionMap = new Map<string, Proposition>(
    propositions.map((prop) => [prop.id, prop])
  );

  function updateDropdownVisibility(newState: State) {
    if (!dropdownElement || dropdownDisplayType === undefined) return;
    dropdownElement.style.display =
      newState instanceof SuggestionsState ? dropdownDisplayType : 'none';
  }

  const registrations = [
    registerPlainText(editor),
    registerMotivCommands(editor, state),
    registerErrorDecorator(editor, propositionMap),
    registerTransformers(editor, propositionMap),
    registerSuggestionUpdater(editor, state, propositionMap),
    dropdownElement &&
      registerAutoSuggestPositionUpdater(editor, state, dropdownElement),
    registerHistory(editor, createEmptyHistoryState(), 1000),
    editor.registerCommand(
      UPDATE_SUGGESTIONS_COMMAND,
      (newSuggestions: Suggestion[]) => {
        state.value.setSuggestions(newSuggestions);
        return false;
      },
      COMMAND_PRIORITY_NORMAL
    ),
    dropdownElement && registerClickAwayHandler(state, dropdownElement),
    state.subscribe((newState) => {
      updateDropdownVisibility(newState);
    }),
  ];
  return mergeRegister(...registrations.filter((unregister) => !!unregister));
}

function createDefaultState(editor: LexicalEditor, state: Signal<State>) {
  const setState = (newState: State) => (state.value = newState);

  return new FreeTextState(editor, setState);
}

function setSource(editor: LexicalEditor, source: string) {
  editor.update(() => {
    $getRoot().clear();
    const paragraph = $createParagraphNode();
    const text = $createTextNode(source);
    paragraph.append(text);
    $getRoot().append(paragraph);
    $getRoot().selectEnd();
  });
}

function registerClickAwayHandler(
  state: Signal<State>,
  dropdownElement: HTMLElement
): () => void {
  const listener = (event: Event) => {
    if (dropdownElement && !dropdownElement.contains(event.target as Node))
      state.value.documentClickHandler(event);
  };
  document.addEventListener('pointerdown', listener);

  return () => document.removeEventListener('click', listener);
}
