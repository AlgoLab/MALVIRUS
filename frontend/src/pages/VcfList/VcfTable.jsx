import React, { useCallback } from 'react';
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  ZoomInOutlined,
} from '@ant-design/icons';
import { Table, message, Modal } from 'antd';
import { Link } from 'react-router-dom';

import {
  Error,
  StatusTag,
  showError,
  TableButton,
  TableLink,
} from 'components';
import { usePersistentState } from 'utils/hooks';
import {
  jobStatusFilters,
  EmptyWithFilters,
  EmptyWoFilters,
  submissionTimeRender,
  submissionTimeSorter,
} from 'utils/tables';

const expandable = {
  expandedRowRender: (record) => (
    <p style={{ margin: 0 }}>
      <b>ID:</b> {record.id}
      <br />
      <b>Description:</b> {record.description}
    </p>
  ),
};

function VcfTable({ vcfs, deleteVcf }) {
  const [state, setState] = usePersistentState('vcfjobtable', {
    sorter: { field: 'submission_time', order: 'descend' },
  });

  const deleteJob = (evt) => {
    const id = evt.currentTarget.name;
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
      sorter: (a, b) => a.alias.localeCompare(b.alias),
      defaultSortOrder:
        state.sorter && state.sorter.field === 'alias'
          ? state.sorter.order
          : undefined,
    },
    {
      title: 'Submission time',
      dataIndex: 'submission_time',
      render: submissionTimeRender,
      sorter: submissionTimeSorter,
      defaultSortOrder:
        state.sorter && state.sorter.field === 'submission_time'
          ? state.sorter.order
          : undefined,
      width: '11em',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (value) => <StatusTag status={value} />,
      width: '10em',
      defaultFilteredValue:
        (state.filters && state.filters.status) || undefined,
      ...jobStatusFilters,
    },
    {
      title: 'Results',
      key: 'results',
      dataIndex: 'id',
      render: (value) => (
        <TableLink name={value} icon={<ZoomInOutlined />}>
          Details
        </TableLink>
      ),
      width: '10em',
      align: 'center',
    },
    {
      title: 'Actions',
      key: 'actions',
      dataIndex: 'id',
      render: (value) => (
        <TableButton
          name={value}
          ghost
          type="danger"
          icon={<DeleteOutlined />}
          onClick={deleteJob}
        >
          Delete
        </TableButton>
      ),
      width: '9em',
      align: 'center',
    },
  ];

  const handleChange = useCallback(
    (pagination, filters, sorter) => setState({ pagination, filters, sorter }),
    [setState]
  );

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
      loading={vcfs.pending}
      expandable={expandable}
      onChange={handleChange}
      pagination={state.pagination}
      locale={{
        emptyText:
          state.filters && state.filters.status != null
            ? EmptyWithFilters
            : EmptyWoFilters,
      }}
      showSorterTooltip={false}
    ></Table>
  );
}

function AsyncVcfTable({ vcfs, ...props }) {
  if (vcfs.rejected) {
    return <Error reason={vcfs.reason} />;
  }
  return <VcfTable vcfs={vcfs} {...props} />;
}

export default AsyncVcfTable;
