import React, { useMemo, useCallback } from 'react';

import { Table, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import { defaultReportConfig } from 'app-config';
import { usePersistentState } from 'utils/hooks';
import { NoDataWithFilters, NoDataWoFilters } from 'utils/tables';

import GenotypeCell from './GenotypeCell';
import TableForm from './TableForm';
import EffectsText from './EffectsText';

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
    dataIndex: '_info',
    render: (value) => value && value.GENE,
  },
  {
    title: (
      <>
        Effect{' '}
        <Tooltip title="Click on the effect for full report">
          <QuestionCircleOutlined />
        </Tooltip>
      </>
    ),
    dataIndex: '_info',
    render: (value) =>
      (value && value.ANN && <EffectsText effects={value.ANN} />) || 'None',
  },
  {
    title: 'Genotype',
    dataIndex: '_genotype',
    render: (value, record) => <GenotypeCell value={value} record={record} />,
  },
];

const titleStyle = { margin: '0.5em' };
const tableScroll = { x: '100%' };

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
      <p style={titleStyle}>
        Showing {filteredData.length} loci ({data.length - filteredData.length}{' '}
        hidden by filters)
      </p>
    ),
    [filteredData, data]
  );

  return (
    <Table
      rowKey="_key"
      dataSource={filteredData}
      columns={columns}
      size="small"
      bordered
      scroll={tableScroll}
      title={title}
      locale={{
        emptyText:
          data.length > 0 && filteredData.length === 0
            ? NoDataWithFilters
            : NoDataWoFilters,
      }}
    />
  );
}

function GenotypeTableWithForm({ data }) {
  const [state, setState] = usePersistentState(
    'filtergenotable',
    defaultReportConfig
  );
  const genes = useMemo(
    () => [...new Set(data.map(({ _gene }) => _gene))].filter(Boolean),
    [data]
  );
  return (
    <>
      <TableForm state={state} setState={setState} genes={genes} />
      <GenotypeTable data={data} config={state} />
    </>
  );
}

export default GenotypeTableWithForm;
