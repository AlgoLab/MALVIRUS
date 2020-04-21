import React, { useMemo, useCallback } from 'react';

import { defaultReportConfig } from 'app-config';
import { usePersistentState } from 'utils/hooks';

import GenotypeCell from './GenotypeCell';
import VirtualTable from './VirtualTable';
import TableForm from './TableForm';

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
    dataIndex: '_genotype',
    render: (value, record) => <GenotypeCell value={value} record={record} />,
  },
];

const tableScroll = { y: 400, x: '100%' };

function GenotypeTable({ data, config }) {
  const filteredData = useMemo(
    () =>
      data.filter((locus) => {
        // Only ALT
        if (config.only_alt && (!locus._genotype || locus._genotype[0] === 0))
          return false;
        // Min GQ
        if (
          config.mingq != null &&
          locus._genotype &&
          locus._genotype[1] < +config.mingq
        )
          return false;
        // Gene
        if (
          config.gene != null &&
          config.gene.length > 0 &&
          !config.gene.includes(locus._gene)
        )
          return false;
        return true;
      }),
    [data, config]
  );

  const title = useCallback(
    () => (
      <p style={{ margin: '0.5em' }}>
        Showing {filteredData.length} loci ({data.length - filteredData.length}{' '}
        hidden by filters)
      </p>
    ),
    [filteredData, data]
  );

  return (
    <VirtualTable
      rowKey="_key"
      dataSource={filteredData}
      columns={columns}
      size="small"
      bordered
      scroll={tableScroll}
      title={title}
    />
  );
}

function GenotypeTableWithForm({ data }) {
  const [state, setState] = usePersistentState(
    'filtergenotable',
    defaultReportConfig
  );
  const genes = useMemo(() => [...new Set(data.map(({ _gene }) => _gene))], [
    data,
  ]);
  return (
    <>
      <TableForm state={state} setState={setState} genes={genes} />
      <GenotypeTable data={data} config={state} />
    </>
  );
}

export default GenotypeTableWithForm;
