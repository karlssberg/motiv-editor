import { COMMAND_PRIORITY_NORMAL, createEditor, LexicalEditor } from 'lexical';
import {
  motivConfig,
  Proposition,
  registerMotivEditor,
  Suggestion,
  UPDATE_SUGGESTIONS_COMMAND,
  HIGHLIGHT_SUGGESTION_COMMAND,
} from 'logical-motiv';
import { useEffect, useMemo, useRef, useState } from 'react';
import classnames from 'classnames';
import { CHOOSE_SUGGESTION_COMMAND } from 'logical-motiv';
import { createPortal } from 'react-dom';
import { mergeRegister } from '@lexical/utils';

const escapeRegExp = (text: string) =>
  text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

interface VanillaMotivEditorProps {
  source: string;
  propositions: Proposition[];
  onChange?: (source: string) => void;
}
const emptyArray: Suggestion[] = [];

export function VanillaMotivEditor({
  propositions,
  source,
  onChange,
}: VanillaMotivEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [editor] = useState<LexicalEditor>(() => createEditor(motivConfig));
  const [suggestions, setSuggestions] = useState<Suggestion[]>(emptyArray);
  const [searchText, setSearchText] = useState<string>('');
  const [highlightedSuggestion, setHighlightedSuggestion] =
    useState<Suggestion | null>(null);

  useEffect(() => {
    editor.setRootElement(containerRef.current!);
    return mergeRegister(
      registerMotivEditor(editor, {
        source,
        propositions,
        dropdownElement: dropdownRef.current!,
      }),
      editor.registerCommand(
        UPDATE_SUGGESTIONS_COMMAND,
        (suggestions: Suggestion[]) => {
          setSuggestions(suggestions);
          return false;
        },
        COMMAND_PRIORITY_NORMAL
      ),

      editor.registerCommand(
        HIGHLIGHT_SUGGESTION_COMMAND,
        (suggestion: Suggestion) => {
          setHighlightedSuggestion(suggestion);
          return false;
        },
        COMMAND_PRIORITY_NORMAL
      )
    );
  }, [source, editor, propositions, containerRef.current, dropdownRef.current]);

  const renderedSuggestions = useMemo(() => {
    const escapedSearchCriteria = escapeRegExp(searchText);
    const searchRegExp = new RegExp(`(${escapedSearchCriteria})`, 'gi');

    return suggestions.map((suggestion, index) => {
      const textParts = suggestion.value.split(searchRegExp);
      return (
        <li
          className={classnames(
            {
              'bg-blue-200 text-blue-900':
                suggestion.value === highlightedSuggestion?.value,
            },
            'hover:bg-blue-200 hover:text-blue-900 cursor-pointer p-1'
          )}
          key={suggestion.value}
          onKeyDown={(event) => event.preventDefault()}
          onClick={(event) => {
            editor.dispatchCommand(CHOOSE_SUGGESTION_COMMAND, suggestion);
            event.preventDefault();
          }}
        >
          {textParts.map((part, index) => {
            const upperCasePart = part.toUpperCase();
            const upperCaseSearchText = searchText.toUpperCase();
            return (
              <span
                className={classnames({
                  'font-bold': upperCasePart === upperCaseSearchText,
                })}
                key={`${index}-${textParts}`}
              >
                {part}
              </span>
            );
          })}
        </li>
      );
    });
  }, [editor, highlightedSuggestion, suggestions, searchText]);

  return (
    <>
      <div
        contentEditable={true}
        className="min-w-96 p-4 rounded-md"
        ref={containerRef}
      ></div>
      {createPortal(
        <div
          ref={dropdownRef}
          className="absolute bg-white border border-gray-300 rounded-md shadow-md"
        >
          {<ul>{...renderedSuggestions}</ul>}
        </div>,
        document.body
      )}
    </>
  );
}
