import React, { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, Space } from 'antd';

import { PlusOutlined, UploadOutlined, SyncOutlined } from '@ant-design/icons';

import VcfTable from './VcfTable';

function VcfList({ vcfs, reloadVcfs }) {
  const navigate = useNavigate();
  const onClickNew = useCallback(() => navigate('new'), [navigate]);
  const onClickUpload = useCallback(() => navigate('upload'), [navigate]);
  return (
    <>
      <h1>Reference VCFs</h1>
      <p>It displays the list of reference VCFs available on the system.</p>
      <p>Click on a reference VCF ID to view the details.</p>
      <VcfTable vcfs={vcfs} />
      <div style={{ textAlign: 'center' }}>
        <Space>
          <Button icon={<PlusOutlined />} size="large" onClick={onClickNew}>
            Build a new reference VCF from genomes
          </Button>
          <Button
            icon={<UploadOutlined />}
            size="large"
            onClick={onClickUpload}
          >
            Upload a new reference VCF
          </Button>
          <Button icon={<SyncOutlined />} size="large" onClick={reloadVcfs}>
            Refresh
          </Button>
        </Space>
      </div>
    </>
  );
}

export default VcfList;
