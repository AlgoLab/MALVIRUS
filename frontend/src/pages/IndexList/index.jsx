import React from 'react';
import { Table, Tag, Button } from 'antd';
import { Link } from 'react-router-dom';

import dayjs from 'dayjs';
import { PlusOutlined } from '@ant-design/icons';

const columns = [
  {
    title: 'Job ID',
    dataIndex: 'indexID',
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
    render: (value) => dayjs(value).format(),
  },
];

const fakeData = [
  { indexID: 456, status: 'ongoing', timestamp: Date.now() - 5 },
];

function IndexList() {
  return (
    <>
      <h1>Index list</h1>
      <p>
        It displays the list of indexing jobs submitted to the system, along
        with their status and, if finished, their results.
      </p>
      <p>Click on a job ID to view the details.</p>
      <Table rowKey="indexID" columns={columns} dataSource={fakeData}></Table>
      <div style={{ textAlign: 'center' }}>
        <Button type="primary" icon={<PlusOutlined />} size="large">
          Build a new index
        </Button>
      </div>
    </>
  );
}

export default IndexList;
