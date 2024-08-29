﻿import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { mergeRegister } from '@lexical/utils';
import {
  $getRoot,
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  $isTextNode,
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
  LexicalNode,
  PointType,
} from 'lexical';
import classnames from 'classnames';
import type { Suggestion } from './Suggestion';
import { useMotivStates } from './useMotivStates';
import { Signal } from '@preact/signals-react';
import {
  computePosition,
  ComputePositionReturn,
  ReferenceElement,
} from '@floating-ui/react';
import { escapeRegExp } from './escapeRegExp';
import { $createWhitespaceNode } from './nodes/WhitespaceNode';

function AtomDecorator() {
  return (
    <span
      style={{
        color: 'darkblue',
      }}
    />
  );
}
function OperatorDecorator() {
  return (
    <span
      style={{
        color: 'darkcyan',
      }}
    />
  );
}

interface DropdownPluginProps {
  specs: Signal<Suggestion[]>;
  containerRef: RefObject<HTMLDivElement>;
}

interface Coords {
  top: number;
  left: number;
}

export function MotivPlugin({ specs, containerRef }: DropdownPluginProps) {
  const [editor] = useLexicalComposerContext();
  const [dropdownPosition, setDropdownPosition] = useState<
    Coords | undefined
  >();
  const dropdownRef = useRef(null);
  const [isBrowser, setIsBrowser] = useState(false);
  const { state, selectedIndex, suggestions } = useMotivStates(specs);

  useEffect(
    () =>
      state.subscribe((nextState) => {
        if (nextState.suggestionVisible) {
          updateDropdownPosition();
        }
      }),
    [editor, state]
  );

  useEffect(
    () =>
      mergeRegister(
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
        )
      ),
    [editor, state]
  );

  useEffect(() => {
    const listener = (event: Event) => {
      state.value.documentClickHandler(event);
    };
    document.addEventListener('click', listener);
    return () => document.removeEventListener('click', listener);
  }, [state]);

  const updateDropdownPosition = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection) && selection.isCollapsed()) {
      setTimeout(() => {
        const domSelection = getSelection();
        const domRange =
          domSelection?.rangeCount !== 0 && domSelection?.getRangeAt(0);

        if (!domRange || !dropdownRef.current)
          return setDropdownPosition(undefined);

        computePosition(domRange, dropdownRef.current, {
          strategy: 'absolute',
          placement: 'bottom-start',
        })
          .then((pos) => {
            if (pos.x && pos.y)
              setDropdownPosition({ left: pos.x, top: pos.y });
          })
          .catch(() => setDropdownPosition(undefined));
      }, 0);
    }
  }, [state.value.suggestionVisible]);

  useEffect(
    () =>
      editor.registerUpdateListener(() =>
        editor.read(() => {
          if (state.value.suggestionVisible) {
            updateDropdownPosition();
          }
        })
      ),
    [editor, state.value.suggestionVisible]
  );

  useEffect(() => setIsBrowser(true), []);

  const onClick = useCallback(
    (event: MouseEvent, item: Suggestion, index: number) =>
      editor.update(() =>
        state.value.clickHandler(event.nativeEvent, item, index)
      ),
    [editor, state.value]
  );

  const renderedSuggestions = useMemo(() => {
    const searchCriteria = editor.read(() => state.value.getSearchCriteria());
    const escapedSearchCriteria = escapeRegExp(searchCriteria);
    const searchRegExp = new RegExp(`(${escapedSearchCriteria})`, 'gi');

    return suggestions.value.map((suggestion, index) => {
      const textParts = suggestion.value.split(searchRegExp);
      return (
        <li
          className={classnames(
            {
              'bg-blue-200 text-blue-900': index == selectedIndex.value,
            },
            'hover:bg-blue-200 hover:text-blue-900 cursor-pointer p-1'
          )}
          key={suggestion.value}
          onKeyDown={(event) => event.preventDefault()}
          onClick={(event) => onClick(event, suggestion, index)}
        >
          {textParts.map((part, index) => (
            <span
              className={classnames({
                'font-bold':
                  part.toLowerCase() === searchCriteria.toLowerCase(),
              })}
              key={`${index}-${textParts}`}
            >
              {part}
            </span>
          ))}
        </li>
      );
    });
  }, [onClick, selectedIndex.value, suggestions.value]);

  return (
    isBrowser &&
    createPortal(
      <div
        ref={dropdownRef}
        className="absolute bg-white border border-gray-300 rounded-md shadow-md"
        style={{
          top: `${dropdownPosition?.top ?? 0}px`,
          left: `${dropdownPosition?.left ?? 0}px`,
        }}
      >
        {state.value.suggestionVisible && dropdownPosition?.top && (
          <ul>{...renderedSuggestions}</ul>
        )}
      </div>,
      document.body
    )
  );
}

export default MotivPlugin;
