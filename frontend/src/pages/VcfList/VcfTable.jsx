import React from 'react';
import { Table, Button, message, Modal } from 'antd';
import { Link } from 'react-router-dom';

import { Error, StatusTag, showError } from 'components';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

function VcfTable({ vcfs, deleteVcf }) {
  if (vcfs.rejected) {
    return <Error reason={vcfs.reason} />;
  }
  const deleteJob = (evt) => {
    const id = evt.currentTarget.id;
    Modal.confirm({
      title: 'Are you sure you want to delete this reference VCF?',
      icon: <ExclamationCircleOutlined />,
      content: (
        <>
          <p>
            You will be able to access to variant calls performed on this
            reference but you will not able to access to the reference VCF
            details.
          </p>
          <p>The operation cannot be undone.</p>
        </>
      ),
      onOk() {
        return new Promise((resolve, reject) =>
          deleteVcf(id, resolve, reject)
        ).then(() => {
          message.success('Reference VCF successfully deleted!');
          return;
        }, showError);
      },
      onCancel() {},
    });
  };
  const data = vcfs.fulfilled ? vcfs.value.content : [];
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
      loading={vcfs.pending}
    ></Table>
  );
}

export default VcfTable;
