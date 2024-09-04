'use client';

import React, { useCallback, useState, useEffect } from 'react';
import { MotivEditor, Proposition } from 'motiv-editor-react';
import { Client } from './MotivClient';

const motivClient = new Client('http://localhost:5049');

function ClientMotivEditor() {
  const [source, setSource] = useState<string>('');
  const [propositions, setPropositions] = useState<Proposition[]>([]);

  useEffect(() => {
    const load = async () => {
      const response = await motivClient.ruleGET('custom-rule');
      const compatiblePropositions = response.compatiblePropositions;
      const source = response?.source;
      source && setSource(source);
      compatiblePropositions &&
        setPropositions(
          compatiblePropositions
            .filter((p) => !!p.parameters && !!p.template && !!p.id)
            .map<Proposition>((propositions) => ({
              id: propositions.id!,
              template: propositions.template!,
              parameters: propositions.parameters,
            }))
        );
    };
    load().catch(console.error);
  }, []);

  if (!source || !propositions) {
    return <div>Loading...</div>;
  }

  return <MotivEditor propositions={propositions} source={source} />;
}

export default ClientMotivEditor;
