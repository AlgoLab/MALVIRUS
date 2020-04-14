import React from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import { Error } from 'components';
import { StatusTag } from 'components';

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

function CallTable({ calls }) {
  if (calls.rejected) {
    return <Error reason={calls.reason} />;
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
