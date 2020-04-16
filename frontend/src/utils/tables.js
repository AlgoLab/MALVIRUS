import React from 'react';

import { JOB_STATUSES } from 'app-config';
import { keyBy } from 'utils';
import { Empty } from 'antd';

export const jobStatusFilters = {
  filters: Object.keys(keyBy(JOB_STATUSES, 'value')).map((status) => ({
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
