import React from 'react';

import { Empty } from 'antd';

import { JOB_STATUSES } from 'app-config';

export const jobStatusFilters = {
  filters: Object.keys(JOB_STATUSES).map((status) => ({
    text: status,
    value: status,
  })),
  onFilter: (value, record) => record.status === value,
};

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
