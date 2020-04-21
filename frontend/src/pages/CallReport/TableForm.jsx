import React, { useState, useCallback } from 'react';

import { Form, Checkbox, Col, InputNumber, Select, Button } from 'antd';

import { defaultReportConfig } from 'app-config';

import { form, resetBtn } from './TableForm.module.css';

function normFields(fields) {
  return Object.fromEntries(fields.map(({ name, value }) => [name[0], value]));
}

function TableForm({ state, setState, genes }) {
  const [formkey, setFormkey] = useState(0);
  const onReset = useCallback(() => {
    setState(defaultReportConfig);
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
      </Col>
      <Col span={6} className={resetBtn}>
        <Button onClick={onReset} block>
          Reset filters
        </Button>
      </Col>
    </Form>
  );
}

export default TableForm;
