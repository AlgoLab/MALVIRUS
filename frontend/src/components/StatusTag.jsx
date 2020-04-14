import React from 'react';
import { Tag } from 'antd';

// Completed Failed Running

const colors = {
  Completed: 'success',
  Running: 'processing',
  Failed: 'error',
  Pending: 'warning',
  Uploaded: 'success',
};

function StatusTag({ status }) {
  return <Tag color={colors[status] || 'default'}>{status}</Tag>;
}

export default StatusTag;
