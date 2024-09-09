'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { MotivEditor, ParameterInfo, Proposition } from 'motiv-editor-react';
import {
  Client,
  MotivTypeResource,
  PropositionResource,
  PutRuleResource,
} from './MotivClient';

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
  const [initialSource, setInitialSource] = useState<string>('');
  const [editedSource, setEditedSource] = useState<string>('');
  const [propositions, setPropositions] = useState<Proposition[]>([]);

  useEffect(() => {
    const load = async () => {
      const response = await motivClient.ruleGET('custom-rule');
      const compatiblePropositions = response.compatiblePropositions;
      const source = response?.source;
      source && setInitialSource(source);
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
      new PutRuleResource({ source: editedSource })
    );
  }, [editedSource]);

  const changeHandler = useCallback<(source: string) => void>((source) => {
    setEditedSource(source);
  }, []);

  if (!initialSource || !propositions) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <MotivEditor
        propositions={propositions}
        source={initialSource}
        onChange={changeHandler}
      />
      <button onClick={saveHandler}>Save</button>
    </>
  );
}

export default ClientMotivEditor;
