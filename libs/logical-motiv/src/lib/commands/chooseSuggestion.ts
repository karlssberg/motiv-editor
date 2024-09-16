import { Suggestion } from 'logical-motiv';
import { createCommand } from 'lexical';

export const CHOOSE_SUGGESTION_COMMAND = createCommand<Suggestion>();
