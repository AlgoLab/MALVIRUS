import React from 'react';
import { Tag } from 'antd';

import { JOB_STATUSES } from 'app-config';
import { keyBy } from 'utils';

const colors = keyBy(JOB_STATUSES, 'value', ({ color }) => color);

function StatusTag({ status }) {
  return <Tag color={colors[status] || 'default'}>{status}</Tag>;
}

export default StatusTag;
