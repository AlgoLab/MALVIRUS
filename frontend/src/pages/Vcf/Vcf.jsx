import React from 'react';

function Vcf({ id, vcf }) {
  return (
    <>
      <h1>Reference VCF {id}</h1>
      <p>It displays the details of the reference VCF.</p>
      <pre>{JSON.stringify(vcf, null, 2)}</pre>
    </>
  );
}

export default Vcf;
