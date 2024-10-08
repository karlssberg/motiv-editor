﻿// import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
// import type { MouseEvent } from 'react';
// import {
//   RefObject,
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from 'react';
// import { createPortal } from 'react-dom';
// import { $getSelection, $isRangeSelection } from 'lexical';
// import { mergeRegister } from '@lexical/utils';
// import classnames from 'classnames';
// import {
//   computePosition,
//   ComputePositionConfig,
//   ComputePositionReturn,
// } from '@floating-ui/dom';
// import {
//   Proposition,
//   signal,
//   Suggestion,
//   registerMotivEditor, State, FreeTextState,
// } from 'logical-motiv';
// import { UPDATE_SUGGESTIONS_COMMAND } from 'logical-motiv';
// interface MotivPluginProps {
//   propositions: Proposition[];
//   containerRef: RefObject<HTMLElement>;
//   defaultPositionRef: RefObject<HTMLElement>;
//   onChange?: (source: string) => void;
//   source: string;
// }
//
// const escapeRegExp = (text: string) =>
//   text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
//
// const computePositionOptions: Partial<ComputePositionConfig> = {
//   strategy: 'absolute',
//   placement: 'bottom-start',
// };
//
// interface Coords {
//   top: number;
//   left: number;
// }
//
// export function MotivPlugin({
//   propositions,
//   defaultPositionRef,
//   onChange,
//   source,
// }: MotivPluginProps) {
//   const [editor] = useLexicalComposerContext();
//   const [dropdownPosition, setDropdownPosition] = useState<
//     Coords | undefined
//   >();
//   const [state] = useState<State>(() => new FreeTextState(editor, null!));
//   const dropdownRef = useRef(null);
//   const [isBrowser, setIsBrowser] = useState(false);
//   const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
//
//   useEffect(() => {
//     return mergeRegister(
//       registerMotivEditor(editor, { propositions, source }),
//       editor.registerTextContentListener((text) => {
//         onChange && onChange(text);
//       }),
//       editor.registerUpdateListener(() =>
//         editor.read(() => {
//           if (state.suggestionVisible) {
//             updateDropdownPosition();
//           }
//         })
//       ),
//       editor.registerCommand(
//         UPDATE_SUGGESTIONS_COMMAND,
//         (newSuggestions: Suggestion[]) => {
//           setSuggestions(newSuggestions);
//           return false;
//         },
//         0
//       )
//     );
//   }, [editor, propositions, state]);
//
//   useEffect(() => {
//     state.setSuggestions(suggestions);
//   }, [state, suggestions]);
//
//   useEffect(() => {
//     if (state.suggestionVisible) {
//       updateDropdownPosition();
//     }
//   }, [editor, state]);
//
//   useEffect(() => {
//     const listener = (event: Event) => {
//       state.documentClickHandler(event);
//     };
//     document.addEventListener('click', listener);
//     return () => document.removeEventListener('click', listener);
//   }, [state]);
//
//   const updateDropdownPosition = useCallback(() => {
//     editor.read(() => {
//       const selection = $getSelection();
//       if ($isRangeSelection(selection) && selection.isCollapsed()) {
//         setTimeout(async () => {
//           const domSelection = getSelection();
//           const domRange =
//             domSelection?.rangeCount !== 0 && domSelection?.getRangeAt(0);
//
//           if (!domRange || !dropdownRef.current)
//             return setDropdownPosition(undefined);
//
//           try {
//             let pos = await computePosition(
//               domRange,
//               dropdownRef.current,
//               computePositionOptions
//             );
//             if (!isValidPosition(pos) && defaultPositionRef.current) {
//               pos = await computePosition(
//                 defaultPositionRef.current,
//                 dropdownRef.current,
//                 computePositionOptions
//               );
//             }
//             setDropdownPosition({ left: pos.x, top: pos.y });
//           } catch (e) {
//             setDropdownPosition(undefined);
//           }
//
//           function isValidPosition(pos: ComputePositionReturn): boolean {
//             if (!pos) return false;
//
//             return !!pos.x || !!pos.y;
//           }
//         }, 0);
//       }
//     });
//   }, [state.suggestionVisible]);
//
//   useEffect(() => setIsBrowser(true), []);
//
//   const onClick = useCallback(
//     (event: MouseEvent, item: Suggestion) => {
//       event.preventDefault();
//       return editor.update(() => state.selectSuggestion(item));
//     },
//     [editor, state]
//   );
//
//   const renderedSuggestions = useMemo(() => {
//     const searchText = state.getSearchText();
//     const escapedSearchCriteria = escapeRegExp(searchText);
//     const searchRegExp = new RegExp(`(${escapedSearchCriteria})`, 'gi');
//
//     return suggestions.map((suggestion, index) => {
//       const textParts = suggestion.value.split(searchRegExp);
//       return (
//         <li
//           className={classnames(
//             {
//               'bg-blue-200 text-blue-900':
//                 suggestion.value === selectedSuggestion?.value,
//             },
//             'hover:bg-blue-200 hover:text-blue-900 cursor-pointer p-1'
//           )}
//           key={suggestion.value}
//           onKeyDown={(event) => event.preventDefault()}
//           onClick={(event) => onClick(event, suggestion)}
//         >
//           {textParts.map((part, index) => {
//             const upperCasePart = part.toUpperCase();
//             const upperCaseSearchText = searchText.toUpperCase();
//             return (
//               <span
//                 className={classnames({
//                   'font-bold': upperCasePart === upperCaseSearchText,
//                 })}
//                 key={`${index}-${textParts}`}
//               >
//                 {part}
//               </span>
//             );
//           })}
//         </li>
//       );
//     });
//   }, [onClick, selectedSuggestion, suggestions]);
//
//   return (
//     isBrowser &&
//     createPortal(
//       <div
//         ref={dropdownRef}
//         className="absolute bg-white border border-gray-300 rounded-md shadow-md"
//         style={{
//           top: `${dropdownPosition?.top ?? 0}px`,
//           left: `${dropdownPosition?.left ?? 0}px`,
//         }}
//       >
//         {state.suggestionVisible && dropdownPosition?.top && (
//           <ul>{...renderedSuggestions}</ul>
//         )}
//       </div>,
//       document.body
//     )
//   );
// }
