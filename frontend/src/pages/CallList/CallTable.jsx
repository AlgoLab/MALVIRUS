import { useCallback, useMemo } from 'react';
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  ZoomInOutlined,
} from '@ant-design/icons';
import TableIcon from '@2fd/ant-design-icons/lib/Table';
import { Table, message, Modal } from 'antd';
import { Link } from 'react-router-dom';

import {
  Description,
  Error,
  PangolinOutputDescription,
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
import { JOB_STATUSES } from 'app-config';

const expandable = {
  expandedRowRender: (record) => (
    <>
      <b>ID:</b> {record.id}
      <br />
      <Description header="Description:" description={record.description} />
      {record.pangolin && <PangolinOutputDescription pred={record.pangolin} />}
    </>
  ),
};

function CallTable({ calls, deleteCall }) {
  const [state, setState] = usePersistentState('calljobtable', {
    sorter: { field: 'submission_time', order: 'descend' },
  });

  const deleteJob = useCallback(
    (evt) => {
      const id = evt.currentTarget.name;
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
    },
    [deleteCall]
  );

  const data = calls.fulfilled ? calls.value.content : [];
  const columns = useMemo(
    () => [
      {
        title: 'Job alias',
        dataIndex: 'alias',
        render: (value, record) => <Link to={record.id}>{value}</Link>,
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
        width: '8em',
        defaultFilteredValue:
          (state.filters && state.filters.status) || undefined,
        ...jobStatusFilters,
      },
      {
        title: (
          <>
            Pred. lineage <small>(only SARS-CoV-2)</small>
          </>
        ),
        dataIndex: 'pangolin',
        render: (value) => value && <b>{value.lineage}</b>,
        width: '9em',
        align: 'center',
      },
      {
        title: 'Results',
        key: 'results',
        dataIndex: 'id',
        render: (value, record) => {
          const resEnabled =
            record.status &&
            JOB_STATUSES[record.status] &&
            JOB_STATUSES[record.status].success;
          return (
            <>
              <TableLink name={value} icon={<ZoomInOutlined />}>
                Details
              </TableLink>
              <TableLink
                name={`${value}/report`}
                icon={<TableIcon />}
                disabled={!resEnabled}
                title={
                  resEnabled
                    ? 'Show results in tabular format'
                    : 'Results are not available. See details.'
                }
              >
                Results
              </TableLink>
            </>
          );
        },
        width: '10em',
        align: 'center',
      },
      {
        title: '',
        key: 'actions',
        dataIndex: 'id',
        render: (value) => (
          <TableButton
            name={value}
            type="danger"
            ghost
            icon={<DeleteOutlined />}
            onClick={deleteJob}
          />
        ),
        width: '4em',
        align: 'center',
      },
    ],
    [state, deleteJob]
  );

  const handleChange = useCallback(
    (pagination, filters, sorter) => setState({ pagination, filters, sorter }),
    [setState]
  );

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
      loading={calls.pending}
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

function AsyncCallTable({ calls, ...props }) {
  if (calls.rejected) {
    return <Error reason={calls.reason} />;
  }
  return <CallTable calls={calls} {...props} />;
}

export default AsyncCallTable;
