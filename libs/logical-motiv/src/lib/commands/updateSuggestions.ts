import { Suggestion } from 'logical-motiv';
import { createCommand } from 'lexical';

export const UPDATE_SUGGESTIONS_COMMAND = createCommand<Suggestion[]>();
