import React from 'react';

import { Table } from 'antd';

import { PromiseState } from 'react-refetch';
import { Error, Loading } from 'components';

import GenotypeCell from './GenotypeCell';

import { reference, alternate } from './CallReport.module.css';

const columns = [
  {
    title: 'Chrom',
    dataIndex: 'CHROM',
  },
  {
    title: 'Position',
    dataIndex: 'POS',
  },
  {
    title: 'Ref. Allele',
    dataIndex: 'REF',
  },
  {
    title: 'Alt. Allele',
    dataIndex: 'ALT',
  },
  {
    title: 'Gene',
    dataIndex: 'INFO',
    render: (value) =>
      value && value.startsWith('GENE=') ? value.slice(5) : value,
  },
  {
    title: 'Genotype',
    dataIndex: 'DONOR',
    render: (value, record) => <GenotypeCell value={value} record={record} />,
  },
];

const pagination = {
  pageSize: 50,
  showTotal: (total, range) =>
    `Showing ${range[0]}-${range[1]} of ${total} variants`,
};

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
        .reduce((obj, val, idx) => ({ ...obj, [header[idx]]: val }), {})
    )
    .map((variant, idx) => ({
      key: variant.CHROM + variant.POS + idx,
      ...variant,
    }));
  return (
    <Table
      rowKey="key"
      dataSource={data}
      columns={columns}
      size="small"
      pagination={pagination}
      bordered
      rowClassName={(record) =>
        record.DONOR.startsWith('1:') ? alternate : reference
      }
    />
  );
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
