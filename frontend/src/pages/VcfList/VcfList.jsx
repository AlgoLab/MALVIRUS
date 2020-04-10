import React, { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, Space } from 'antd';

import { PlusOutlined, UploadOutlined } from '@ant-design/icons';

import VcfTable from './VcfTable';

function VcfList({ vcfs }) {
  const navigate = useNavigate();
  const onClickNew = useCallback(() => navigate('new'), [navigate]);
  const onClickUpload = useCallback(() => navigate('upload'), [navigate]);
  return (
    <>
      <h1>Index list</h1>
      <p>
        It displays the list of indexing jobs submitted to the system, along
        with their status and, if finished, their results.
      </p>
      <p>Click on a job ID to view the details.</p>
      <VcfTable vcfs={vcfs} />
      <div style={{ textAlign: 'center' }}>
        <Space>
          <Button icon={<PlusOutlined />} size="large" onClick={onClickNew}>
            Build a new input VCF from genomes
          </Button>
          <Button
            icon={<UploadOutlined />}
            size="large"
            onClick={onClickUpload}
          >
            Upload a new VCF
          </Button>
        </Space>
      </div>
    </>
  );
}

export default VcfList;
