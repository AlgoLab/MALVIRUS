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

function VcfTable({ vcfs }) {
  if (vcfs.rejected) {
    return <div>Errore: {JSON.stringify(vcfs.reason)}</div>;
  }
  const data = vcfs.fulfilled ? vcfs.value.content : [];
  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
      loading={vcfs.pending}
    ></Table>
  );
}

export default VcfTable;
