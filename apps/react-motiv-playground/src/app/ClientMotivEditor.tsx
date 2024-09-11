'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { MotivEditor, ParameterInfo } from 'motiv-editor-react';
import {
  Client,
  MotivTypeResource,
  PropositionResource,
  PutRuleResource,
} from './MotivClient';
import { Proposition } from 'motiv-editor-react';

const motivClient = new Client('https://localhost:7203');

function createProposition(proposition: PropositionResource) {
  const parametersArray: [string, MotivTypeResource][] =
    (proposition.parameters && Object.entries(proposition.parameters)) || [];

  const parameters: Record<string, ParameterInfo> = parametersArray.reduce(
    (acc, [key, value]) => {
      acc[key] = {
        type: value.motivType!,
      };
      return acc;
    },
    {} as Record<string, ParameterInfo>
  );

  return new Proposition(proposition.id!, proposition.template!, parameters);
}

function ClientMotivEditor() {
  const [initialRule, setInitialRule] = useState<string>('');
  const [editedRule, setEditedRule] = useState<string>('');
  const [propositions, setPropositions] = useState<Proposition[]>([]);

  useEffect(() => {
    const load = async () => {
      const response = await motivClient.ruleGET('custom-rule');
      const compatiblePropositions = response.compatiblePropositions;
      const source = response?.rule;
      if (source) {
        setInitialRule(source);
        setEditedRule(source);
      }
      compatiblePropositions &&
        setPropositions(
          compatiblePropositions.map<Proposition>(
            (proposition: PropositionResource): Proposition => {
              return createProposition(proposition);
            }
          )
        );
    };
    load().catch(console.error);
  }, []);

  const saveHandler = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(async () => {
    await motivClient.rulePUT(
      'custom-rule',
      new PutRuleResource({ rule: editedRule })
    );
  }, [editedRule]);

  const changeHandler = useCallback<(source: string) => void>((source) => {
    setEditedRule(source);
  }, []);

  if (!initialRule || !propositions) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <MotivEditor
        propositions={propositions}
        source={initialRule}
        onChange={changeHandler}
      />
      <div className="pl-1">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          onClick={saveHandler}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default ClientMotivEditor;
