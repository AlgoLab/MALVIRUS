import React from 'react';

import { PromiseState } from 'react-refetch';
import { Error, Loading } from 'components';

import GenotypeTable from './GenotypeTable';

function BodyCallReport({ call: value, vcf }) {
  const [pheader, ...bdata] = vcf
    .split('\n')
    .filter(Boolean)
    .filter((line) => !line.startsWith('##'));
  const header = pheader.slice(1).split('\t');
  const data = bdata
    .map((line) =>
      line
        .split('\t')
        .reduce((obj, val, idx) => ({ [header[idx]]: val, ...obj }), {})
    )
    .map((variant, idx) => ({
      _key: variant.CHROM + variant.POS + idx,
      _genotype:
        variant.DONOR && variant.DONOR.indexOf(':') === -1
          ? undefined
          : variant.DONOR.split(':').map((x) => +x),
      ...variant,
      _gene:
        variant.INFO && variant.INFO.startsWith('GENE=')
          ? variant.INFO.slice(5)
          : undefined,
    }));
  return <GenotypeTable data={data} />;
}

function AsyncBodyCallReport({ call, vcf }) {
  if (call.pending) return <Loading />;
  if (call.rejected) return <Error reason={call.reason} />;
  if (!vcf) return <Loading />;
  const all = PromiseState.all([call, vcf]);
  if (all.pending) return <Loading />;
  if (all.rejected) return <Error reason={all.reason} />;
  const [callValue, vcfValue] = all.value;
  return <BodyCallReport call={callValue} vcf={vcfValue} />;
}

function CallReport({ id, call, vcf }) {
  return (
    <>
      <h1>
        Variant calling job{' '}
        <b>
          {(call && call.fulfilled && call.value && call.value.alias) || id}
        </b>
      </h1>
      <AsyncBodyCallReport call={call} vcf={vcf} />
    </>
  );
}

export default CallReport;
