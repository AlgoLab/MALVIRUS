import React from 'react';
import { useParams } from 'react-router-dom';

function Index() {
  const { id } = useParams();
  return (
    <>
      <h1>Indexing job {id}</h1>
      <p>It displays the details of the index.</p>
    </>
  );
}

export default Index;
