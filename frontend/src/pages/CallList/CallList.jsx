import { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button } from 'antd';
import { PlusOutlined, SyncOutlined } from '@ant-design/icons';

import { ButtonPanel } from 'components';

import CallTable from './CallTable';

function CallList({ calls, reloadCalls, deleteCall }) {
  const navigate = useNavigate();
  const onClickNew = useCallback(() => navigate('new'), [navigate]);
  const buttons = (
    <ButtonPanel>
      <Button icon={<PlusOutlined />} size="large" onClick={onClickNew}>
        Perform a new variant call
      </Button>
      <Button icon={<SyncOutlined />} size="large" onClick={reloadCalls}>
        Refresh
      </Button>
    </ButtonPanel>
  );
  return (
    <>
      <h1>Call list</h1>
      <p>
        It displays the list of jobs submitted to the system, along with their
        status and, if finished, their results.
      </p>
      <p>Click on a job alias to view the details.</p>
      {buttons}
      <CallTable calls={calls} deleteCall={deleteCall} />
      {buttons}
    </>
  );
}

export default CallList;
