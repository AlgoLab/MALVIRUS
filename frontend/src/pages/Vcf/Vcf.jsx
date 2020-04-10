import React from 'react';
import { Button } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

function Vcf({ id, vcf, reloadVcf }) {
  return (
    <>
      <h1>Reference VCF {id}</h1>
      <p>It displays the details of the reference VCF.</p>
      <pre>{JSON.stringify(vcf, null, 2)}</pre>
      <Button type="primary" icon={<SyncOutlined />} onClick={reloadVcf}>
        Refresh
      </Button>
    </>
  );
}

export default Vcf;
