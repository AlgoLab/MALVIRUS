import React from 'react';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Table, Button, message, Modal } from 'antd';
import { Link } from 'react-router-dom';

import { Error, StatusTag, showError } from 'components';

function CallTable({ calls, deleteCall }) {
  if (calls.rejected) {
    return <Error reason={calls.reason} />;
  }
  const deleteJob = (evt) => {
    const id = evt.currentTarget.id;
    Modal.confirm({
      title: 'Are you sure you want to delete this variant call job?',
      icon: <ExclamationCircleOutlined />,
      content: <p>The operation cannot be undone.</p>,
      onOk() {
        return new Promise((resolve, reject) =>
          deleteCall(id, resolve, reject)
        ).then(() => {
          message.success('Variant call job successfully deleted!');
          return;
        }, showError);
      },
      onCancel() {},
    });
  };
  const data = calls.fulfilled ? calls.value.content : [];
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
      width: '12em',
    },
    {
      title: 'Actions',
      dataIndex: 'id',
      render: (value) => (
        <Button
          id={value}
          type="danger"
          size="small"
          icon={<DeleteOutlined />}
          onClick={deleteJob}
        >
          Delete
        </Button>
      ),
      width: '10em',
    },
  ];

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
