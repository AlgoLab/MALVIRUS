import React from 'react';
import { Table, Tag } from 'antd';
import { Link } from 'react-router-dom';

import dayjs from 'dayjs';

const columns = [
  {
    title: 'Job ID',
    dataIndex: 'id',
    render: (value) => <Link to={`${value}`}>{value}</Link>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (value) => <Tag>{value}</Tag>,
  },
  {
    title: 'Timestamp',
    dataIndex: 'timestamp',
    render: (value) => (value ? dayjs(value).format() : '(sconosciuto)'),
  },
];

function CallTable({ calls }) {
  if (calls.rejected) {
    return <div>Errore: {JSON.stringify(calls.reason)}</div>;
  }
  const data = calls.fulfilled ? calls.value.content : [];
  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
      loading={calls.pending}
    ></Table>
  );
}

export default CallTable;
