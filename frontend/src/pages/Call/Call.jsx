import React from 'react';
import { Button } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

function Call({ id, call, reloadCall }) {
  return (
    <>
      <h1>Variant calling job {id}</h1>
      <p>It displays the details of the variant calling job.</p>
      <pre>{JSON.stringify(call, null, 2)}</pre>
      <Button type="primary" icon={<SyncOutlined />} onClick={reloadCall}>
        Refresh
      </Button>
    </>
  );
}

export default Call;
