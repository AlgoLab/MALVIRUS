import React from 'react';

import { Empty } from 'antd';

import { JOB_STATUSES } from 'app-config';
import dayjs from 'dayjs';

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

export const EmptyWithFilters = (
  <Empty
    description={
      <>
        No job found!
        <br />
        Some filters are active: disable them to see the full list.
      </>
    }
  />
);

export const EmptyWoFilters = <Empty description="No job found!" />;

export const NoDataWithFilters = (
  <Empty
    description={
      <>
        No Data!
        <br />
        Some filters are active: disable them to see the full list.
      </>
    }
  />
);

export const NoDataWoFilters = <Empty description="No Data!" />;
