import React from 'react';
import { Table, Tag, Button } from 'antd';
import { Link } from 'react-router-dom';

import dayjs from 'dayjs';
import { PlusOutlined } from '@ant-design/icons';

const columns = [
  {
    title: 'Job ID',
    dataIndex: 'callID',
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
  { callID: 123, status: 'ongoing', timestamp: Date.now() - 5 },
];

function CallList() {
  return (
    <>
      <h1>Call list</h1>
      <p>
        It displays the list of jobs submitted to the system, along with their
        status and, if finished, their results.
      </p>
      <p>Click on a job ID to view the details.</p>
      <Table rowKey="callID" columns={columns} dataSource={fakeData}></Table>
      <div style={{ textAlign: 'center' }}>
        <Button type="primary" icon={<PlusOutlined />} size="large">
          Perform a new call
        </Button>
      </div>
    </>
  );
}

export default CallList;
