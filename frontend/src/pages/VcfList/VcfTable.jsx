import React from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';

import { Error, StatusTag } from 'components';

const columns = [
  {
    title: 'Job alias',
    dataIndex: 'alias',
    render: (value, record) => <Link to={`${record.id}`}>{value}</Link>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (value) => <StatusTag status={value} />,
    width: '14em',
  },
];

function VcfTable({ vcfs }) {
  if (vcfs.rejected) {
    return <Error reason={vcfs.reason} />;
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
