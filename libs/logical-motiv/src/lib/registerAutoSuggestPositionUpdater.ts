import { Signal, State, SuggestionsState } from 'logical-motiv';
import {
  computePosition,
  ComputePositionConfig,
  ComputePositionReturn,
} from '@floating-ui/dom';
import {
  LexicalEditor,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_NORMAL,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { SHOW_SUGGESTIONS_COMMAND } from './commands';
import { mergeRegister } from '@lexical/utils';
import { debounce } from 'next/dist/server/utils';

export function registerAutoSuggestPositionUpdater(
  editor: LexicalEditor,
  state: Signal<State>,
  dropdownElement: HTMLElement
): () => void {
  return mergeRegister(
    editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        if (state.value instanceof SuggestionsState) {
          updateDropdownPosition(editor, dropdownElement!);
        }

        return false;
      },
      COMMAND_PRIORITY_NORMAL
    ),
    editor.registerCommand(
      SHOW_SUGGESTIONS_COMMAND,
      (show) => {
        if (show) {
          updateDropdownPosition(editor, dropdownElement!);
        }
        return false;
      },
      COMMAND_PRIORITY_NORMAL
    )
  );
}

function updateDropdownPosition(
  editor: LexicalEditor,
  dropdownElement: HTMLElement
): void {
  const selection = $getSelection();
  if ($isRangeSelection(selection) && selection.isCollapsed()) {
    async function calcPosition() {
      const domSelection = getSelection();
      const domRange =
        domSelection?.rangeCount !== 0 && domSelection?.getRangeAt(0);

      if (!domRange || !dropdownElement) {
        setDropdownPosition(null);
        return;
      }
      try {
        let pos = await computePosition(
          domRange,
          dropdownElement,
          computePositionOptions
        );
        const rootElement = editor.getRootElement();
        if (!isValidPosition(pos) && rootElement) {
          pos = await computePosition(
            rootElement,
            dropdownElement,
            computePositionOptions
          );
          const { padding, border } = getTopLeftPaddingAndBorder(rootElement);
          setDropdownPosition({
            left: pos.x + padding.left + border.left,
            top: pos.y - padding.top - border.top,
          });
          return;
        }
        setDropdownPosition({
          left: pos.x,
          top: pos.y,
        });
      } catch (e) {
        setDropdownPosition(null);
      }

      function isValidPosition(pos: ComputePositionReturn): boolean {
        if (!pos) return false;

        return !!pos.x || !!pos.y;
      }
    }

    calcPosition().catch(console.error);
  }

  function setDropdownPosition(
    pos: { left: number; top: number } | null
  ): void {
    if (!pos) {
      dropdownElement.style.display = 'none';
      return;
    }
    dropdownElement.style.position = 'absolute';
    dropdownElement.style.top = `${pos.top}px`;
    dropdownElement.style.left = `${pos.left}px`;
  }
}

const computePositionOptions: Partial<ComputePositionConfig> = {
  strategy: 'absolute',
  placement: 'bottom-start',
};

function getTopLeftPaddingAndBorder(element: HTMLElement) {
  const style = window.getComputedStyle(element);

  return {
    padding: {
      top: parseFloat(style.paddingTop),
      left: parseFloat(style.paddingLeft),
    },
    border: {
      top: parseFloat(style.borderTopWidth),
      left: parseFloat(style.borderLeftWidth),
    },
  };
}
