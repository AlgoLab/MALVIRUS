import React from 'react';
import { Button, Space } from 'antd';

import { PlusOutlined, UploadOutlined } from '@ant-design/icons';

import VcfTable from './VcfTable';

function VcfList({ vcf }) {
  return (
    <>
      <h1>Index list</h1>
      <p>
        It displays the list of indexing jobs submitted to the system, along
        with their status and, if finished, their results.
      </p>
      <p>Click on a job ID to view the details.</p>
      <VcfTable vcf={vcf} />
      <div style={{ textAlign: 'center' }}>
        <Space>
          <Button icon={<PlusOutlined />} size="large">
            Build a new input VCF from genomes
          </Button>
          <Button icon={<UploadOutlined />} size="large">
            Upload a new VCF
          </Button>
        </Space>
      </div>
    </>
  );
}

export default VcfList;
