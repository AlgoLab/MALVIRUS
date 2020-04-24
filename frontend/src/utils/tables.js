import React from 'react';

import { Empty } from 'antd';

import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import { JOB_STATUSES } from 'app-config';

export const jobStatusFilters = {
  filters: Object.keys(JOB_STATUSES).map((status) => ({
    text: status,
    value: status,
  })),
  onFilter: (value, record) => record.status === value,
};

export const submissionTimeRender = (value) =>
  value != null ? dayjs.unix(value).format('YYYY-MM-DD HH:mm') : <i>n.a.</i>;

export const submissionTimeSorter = (a, b) =>
  (a.submission_time || 0) - (b.submission_time || 0);

const spanStyle = { display: 'block', marginTop: '1em' };

export const EmptyWithFilters = (
  <Empty
    description={
      <>
        No job found!
        <span style={spanStyle}>
          Some filters are active: disable them to see the full list.
        </span>
      </>
    }
  />
);

export const EmptyWoFilters = (
  <Empty
    description={
      <>
        No job found!
        <span style={spanStyle}>
          <b>Submit a new job</b> with the buttons below
          <br />
          OR
          <br /> have a look to the{' '}
          <Link to="/help/TUTORIAL" target="_blank" style={{ fontWeight: 700 }}>
            awesome tutorial
          </Link>{' '}
          to learn how to use MALVIRUS.
        </span>
      </>
    }
  />
);

export const NoDataWithFilters = (
  <Empty
    description={
      <>
        No Data!
        <span style={spanStyle}>
          Some filters are active: disable them to see the full list.
        </span>
      </>
    }
  />
);

export const NoDataWoFilters = <Empty description="No Data!" />;
