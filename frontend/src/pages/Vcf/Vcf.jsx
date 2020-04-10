import React from 'react';

function Vcf({ id, vcf }) {
  return (
    <>
      <h1>Input VCF job {id}</h1>
      <p>It displays the details of the VCF job.</p>
      <pre>{JSON.stringify(vcf, null, 2)}</pre>
    </>
  );
}

export default Vcf;
