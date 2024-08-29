import React from "react";
import dynamic from 'next/dynamic';

const ClientMotivEditor = dynamic(() => import('./ClientMotivEditor'), {
    ssr: false,
});


export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <div className="flex items-center justify-center h-screen">
      <ClientMotivEditor />
    </div>
  );
}
