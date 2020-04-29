import React, { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, Modal, message } from 'antd';

import { PlusOutlined, UploadOutlined, SyncOutlined } from '@ant-design/icons';
import Update from '@2fd/ant-design-icons/lib/Update';

import { ButtonPanel, showError } from 'components';

import VcfTable from './VcfTable';

function VcfList({ vcfs, reloadVcfs, updateVcfs, deleteVcf }) {
  const navigate = useNavigate();
  const onClickNew = useCallback(() => navigate('new'), [navigate]);
  const onClickUpload = useCallback(() => navigate('upload'), [navigate]);
  const onClickUpdate = useCallback(() => {
    Modal.confirm({
      title: 'Do you want to download new precomputed reference VCFs?',
      icon: <Update />,
      content: (
        <>
          <p>
            This task will download new precomputed reference VCFs from{' '}
            <a
              href="https://github.com/AlgoLab/MALVIRUS-data"
              target="_blank"
              rel="noopener noreferrer"
            >
              MALVIRUS
            </a>
            .
          </p>
          <p>No existing data will be modified or deleted.</p>{' '}
        </>
      ),
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        return new Promise((resolve, reject) =>
          updateVcfs(resolve, reject)
        ).then((res) => {
          if (res && res.status === 'Completed') {
            if (res.log && res.log.startsWith('Already up-to-date.')) {
              message.success('Reference VCFs are already up-to-date!', 4);
            } else {
              message.success('Reference VCFs successfully updated!', 4);
            }
            return res;
          } else if (!res || res.status === 'Error') {
            return showError(res);
          }
        }, showError);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }, [updateVcfs]);
  const buttons = (
    <ButtonPanel>
      <Button icon={<PlusOutlined />} size="large" onClick={onClickNew}>
        Build a new reference VCF from genomes
      </Button>
      <Button icon={<UploadOutlined />} size="large" onClick={onClickUpload}>
        Upload a new reference VCF
      </Button>
      <Button icon={<Update />} size="large" onClick={onClickUpdate}>
        Download new precomputed VCFs
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
