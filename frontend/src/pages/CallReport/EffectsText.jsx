import { useCallback } from 'react';
import { Button, Modal, Table } from 'antd';

import { ANN_FIELDS } from './utils';

const tableScroll = { x: '100%' };

const columns = ANN_FIELDS.map((field) => ({ title: field, dataIndex: field }));

function EffectTable({ effects }) {
  return (
    <Table
      dataSource={effects}
      rowKey="key"
      columns={columns}
      pagination={false}
      size="small"
      scroll={tableScroll}
      bordered
    />
  );
}

const buttonStyle = { display: 'inline', height: 'unset', padding: 'unset' };

function EffectsText({ effects }) {
  const onClick = useCallback(
    () =>
      Modal.info({
        title: 'Effects predicted by SnpEff',
        content: <EffectTable effects={effects} />,
        width: '80%',
        icon: false,
        maskClosable: true,
      }),
    [effects]
  );
  if (!effects) return 'None';
  const effectText = [
    ...new Set(
      effects
        .filter((effect) => effect['Annotation Impact'] !== 'MODIFIER')
        .map((effect) => effect['Annotation'])
    ),
  ].join(', ');
  return (
    <Button onClick={onClick} type="link" style={buttonStyle}>
      {effectText}
    </Button>
  );
}

export default EffectsText;
