import React, { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button } from 'antd';

import { PlusOutlined, UploadOutlined, SyncOutlined } from '@ant-design/icons';

import { ButtonPanel } from 'components';

import VcfTable from './VcfTable';

function VcfList({ vcfs, reloadVcfs, deleteVcf }) {
  const navigate = useNavigate();
  const onClickNew = useCallback(() => navigate('new'), [navigate]);
  const onClickUpload = useCallback(() => navigate('upload'), [navigate]);
  const buttons = (
    <ButtonPanel>
      <Button icon={<PlusOutlined />} size="large" onClick={onClickNew}>
        Build a new reference VCF from genomes
      </Button>
      <Button icon={<UploadOutlined />} size="large" onClick={onClickUpload}>
        Upload a new reference VCF
      </Button>
      <Button icon={<SyncOutlined />} size="large" onClick={reloadVcfs}>
        Refresh
      </Button>
    </ButtonPanel>
  );
  return (
    <>
      <h1>Reference VCFs</h1>
      <p>It displays the list of reference VCFs available on the system.</p>
      <p>Click on a reference VCF alias to view the details.</p>
      {buttons}
      <VcfTable vcfs={vcfs} deleteVcf={deleteVcf} />
      {buttons}
    </>
  );
}

export default VcfList;
