import React from 'react';
import { useParams } from 'react-router-dom';

function Call() {
  const { id } = useParams();
  return (
    <>
      <h1>Call job {id}</h1>
      <p>It displays the details of the call.</p>
    </>
  );
}

export default Call;
