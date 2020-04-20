import React from 'react';
import { Tag } from 'antd';

import { JOB_STATUSES } from 'app-config';

function StatusTag({ status }) {
  return (
    <Tag
      color={(JOB_STATUSES[status] && JOB_STATUSES[status].color) || 'default'}
    >
      {status}
    </Tag>
  );
}

export default StatusTag;
