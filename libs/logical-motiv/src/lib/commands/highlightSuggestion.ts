import { Suggestion } from 'logical-motiv';
import { createCommand } from 'lexical';

export const HIGHLIGHT_SUGGESTION_COMMAND = createCommand<Suggestion | null>();
