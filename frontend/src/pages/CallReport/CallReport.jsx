import React, { useState, useEffect } from 'react';

import { PromiseState } from 'react-refetch';
import { DownloadOutlined } from '@ant-design/icons';

import { Error, Loading } from 'components';

import GenotypeTable from './GenotypeTable';

function vcf2data(vcf) {
  const [pheader, ...data] = vcf
    .split('\n')
    .filter(Boolean)
    .filter((line) => !line.startsWith('##'));
  const header = pheader.slice(1).split('\t');
  return data
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
}

function AsyncBodyCallReport({ call, vcf }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    if (!vcf || vcf.pending || vcf.rejected) return;
    setLoading(true);
    setData(vcf2data(vcf.value));
    setLoading(false);
  }, [vcf]);
  if (call.pending) return <Loading />;
  if (call.rejected) return <Error reason={call.reason} />;
  if (!vcf) return <Loading />;
  const all = PromiseState.all([call, vcf]);
  if (all.pending) return <Loading />;
  if (all.rejected) return <Error reason={all.reason} />;
  if (loading) return <Loading />;
  return <GenotypeTable data={data} />;
}

function CallReport({ id, call, vcf }) {
  const vcfUrl = vcf && vcf.meta && vcf.meta.request && vcf.meta.request.url;
  return (
    <>
      <h1>
        Variant calling job{' '}
        <b>
          {(call && call.fulfilled && call.value && call.value.alias) || id}
        </b>
      </h1>
      <p>
        The table represents the genotype called on the given sample.
        {vcfUrl && (
          <>
            {' '}
            You can also download the results in{' '}
            <a href={vcfUrl} target="_blank" rel="noopener noreferrer" download>
              VCF format <DownloadOutlined />
            </a>
            .
          </>
        )}
      </p>

      <AsyncBodyCallReport call={call} vcf={vcf} />
    </>
  );
}

export default CallReport;
