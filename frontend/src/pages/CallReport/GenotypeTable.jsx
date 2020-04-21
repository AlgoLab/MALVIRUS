import React, { useState, useMemo, useCallback } from 'react';

import { Form, Checkbox, Col, InputNumber, Select, Button } from 'antd';

import {
  reference,
  alternate,
  form,
  tableXS,
} from './GenotypeTable.module.css';
import { usePersistentState } from 'utils/hooks';

import GenotypeCell from './GenotypeCell';
import VirtualTable from './VirtualTable';

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

function highlight_alt_rows(record) {
  return record._genotype && record._genotype[0] === 1 ? alternate : reference;
}

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
      className={tableXS}
      rowKey="_key"
      dataSource={filteredData}
      columns={columns}
      size="small"
      bordered
      rowClassName={config.highlight_alt ? highlight_alt_rows : undefined}
      scroll={tableScroll}
      title={title}
    />
  );
}

function normFields(fields) {
  return Object.fromEntries(fields.map(({ name, value }) => [name[0], value]));
}

const defaultConfig = {
  only_alt: true,
  mingq: 0,
};

function TableForm({ state, setState, genes }) {
  const [formkey, setFormkey] = useState(0);
  const onReset = useCallback(() => {
    setState(defaultConfig);
    setFormkey(formkey + 1);
  }, [formkey, setState]);

  return (
    <Form
      key={formkey}
      layout="inline"
      initialValues={state}
      name="filtergenotable"
      onFieldsChange={(changedFields, allFields) => {
        if (changedFields.length === 0) return;
        setState(normFields(allFields));
      }}
      className={form}
    >
      <Col span={12}>
        <Form.Item label="Gene" name="gene">
          <Select mode="multiple">
            {genes.map((gene) => (
              <Select.Option key={gene} value={gene}>
                {gene}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Min. genotype quality" name="mingq">
          <InputNumber type="number" min={0} max={100} step={5} />
        </Form.Item>
      </Col>
      <Col span={18}>
        <Form.Item label="" valuePropName="checked" name="only_alt">
          <Checkbox>Show only loci with alt. allele</Checkbox>
        </Form.Item>
        <Form.Item label="" valuePropName="checked" name="highlight_alt">
          <Checkbox>Highlight loci with alt. allele</Checkbox>
        </Form.Item>
      </Col>
      <Col span={6}>
        <Button onClick={onReset} block>
          Reset filters
        </Button>
      </Col>
    </Form>
  );
}

function GenotypeTableWithForm({ data }) {
  const [state, setState] = usePersistentState(
    'filtergenotable',
    defaultConfig
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
