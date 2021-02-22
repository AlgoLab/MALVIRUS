import { useState, useEffect } from 'react';

import { PromiseState } from 'react-refetch';
import { DownloadOutlined, FileExcelOutlined } from '@ant-design/icons';

import { Error, Loading } from 'components';

import GenotypeTable from './GenotypeTable';
import DownloadAsXlsx from './DownloadAsXlsx';
import { ANN_FIELDS } from './utils';

const customTranslation = {
  ANN: function (effects) {
    return effects.split(',').map((effect, idx) => ({
      key: idx,
      ...Object.fromEntries(
        effect.split('|').map((v, i) => [ANN_FIELDS[i] || i, v])
      ),
    }));
  },
};

function info2dict(info) {
  if (!info) return {};
  return Object.fromEntries(
    info
      .split(';')
      .map((field) => field.split('=', 2))
      .map(([key, value]) => [
        key,
        customTranslation[key] ? customTranslation[key](value) : value,
      ])
  );
}

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
        variant.DONOR && variant.DONOR.indexOf(':') !== -1
          ? variant.DONOR.split(':').map((x) => +x)
          : undefined,
      _info: info2dict(variant.INFO),
      ...variant,
    }))
    .map((variant) => ({
      _gene: variant._info && variant._info.GENE,
      ...variant,
    }));
}

const header = [
  'CHROM',
  'POS',
  //  'ID',
  'REF',
  'ALT',
  //  'QUAL',
  //  'FILTER',
  'GENE',
  //  'FORMAT',
  'GT',
  'GQ',
];

function massage({ _genotype, _gene, CHROM, POS, REF, ALT, INFO, DONOR }) {
  const pos = +POS;
  return {
    CHROM,
    POS: isNaN(pos) ? POS : pos,
    REF,
    ALT,
    GENE: _gene || INFO,
    GT: _genotype ? _genotype[0] : DONOR,
    GQ: _genotype ? _genotype[1] : undefined,
  };
}

function AsyncBodyCallReport({ id, call, vcf }) {
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
  const vcfUrl = vcf.meta && vcf.meta.request && vcf.meta.request.url;
  return (
    <>
      <p>
        The table represents the genotypes called on the given sample.
        {vcfUrl && (
          <>
            {' '}
            You can also download the results in{' '}
            <a href={vcfUrl} target="_blank" rel="noopener noreferrer" download>
              VCF format <DownloadOutlined />
            </a>
            {data && (
              <>
                {' '}
                or in{' '}
                <DownloadAsXlsx
                  fileNamePrefix={`GT_${id}`}
                  header={header}
                  massage={massage}
                  data={data}
                >
                  Excel format <FileExcelOutlined />
                </DownloadAsXlsx>
                .
              </>
            )}
          </>
        )}
      </p>
      <GenotypeTable data={data} />
    </>
  );
}

function CallReport({ id, call, vcf }) {
  return (
    <>
      <h1>
        Call report of job{' '}
        <b>
          {(call && call.fulfilled && call.value && call.value.alias) || id}
        </b>
      </h1>
      <AsyncBodyCallReport id={id} call={call} vcf={vcf} />
    </>
  );
}

export default CallReport;
