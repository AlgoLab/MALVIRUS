import React, { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, Space } from 'antd';

import { PlusOutlined, SyncOutlined } from '@ant-design/icons';

import CallTable from './CallTable';

function CallList({ calls, reloadCalls }) {
  const navigate = useNavigate();
  const onClickNew = useCallback(() => navigate('new'), [navigate]);
  return (
    <>
      <h1>Call list</h1>
      <p>
        It displays the list of jobs submitted to the system, along with their
        status and, if finished, their results.
      </p>
      <p>Click on a job ID to view the details.</p>
      <CallTable calls={calls} />
      <div style={{ textAlign: 'center' }}>
        <Space>
          <Button icon={<PlusOutlined />} size="large" onClick={onClickNew}>
            Perform a new variant call
          </Button>
          <Button icon={<SyncOutlined />} size="large" onClick={reloadCalls}>
            Refresh
          </Button>
        </Space>
      </div>
    </>
  );
}

export default CallList;
