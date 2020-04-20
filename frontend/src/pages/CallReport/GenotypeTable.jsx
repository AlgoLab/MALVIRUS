import React, { useState } from 'react';

import { Table, Form, Checkbox, Col, InputNumber, Select, Button } from 'antd';

import GenotypeCell from './GenotypeCell';

import {
  reference,
  alternate,
  form,
  tableXS,
} from './GenotypeTable.module.css';
import { usePersistentState } from 'utils/hooks';

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

function GenotypeTable({ data, config }) {
  const filteredData = data.filter((locus) => {
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
  });

  const pagination = {
    pageSize: 100,
    position: ['topRight', 'bottomRight'],
    showSizeChanger: false,
    showTotal: (total, range) =>
      `Showing ${range[0]}-${range[1]} of ${total} loci (${
        data.length - total
      } hidden by filters)`,
  };

  return (
    <Table
      className={tableXS}
      rowKey="_key"
      dataSource={filteredData}
      columns={columns}
      size="small"
      pagination={pagination}
      bordered
      rowClassName={config.highlight_alt ? highlight_alt_rows : undefined}
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

function GenotypeTableWithForm({ data }) {
  const [state, setState] = usePersistentState(
    'filtergenotable',
    defaultConfig
  );
  const [formkey, setFormkey] = useState(0);
  const genes = [...new Set(data.map(({ _gene }) => _gene))];
  return (
    <>
      <Form
        key={formkey}
        layout="inline"
        initialValues={state}
        name="filtergenotable"
        onFieldsChange={(changedFields, allFields) => {
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
          <Button
            onClick={() => {
              setState(defaultConfig);
              setFormkey(formkey + 1);
            }}
            block
          >
            Reset filters
          </Button>
        </Col>
      </Form>
      <GenotypeTable data={data} config={state} />
    </>
  );
}

export default GenotypeTableWithForm;
