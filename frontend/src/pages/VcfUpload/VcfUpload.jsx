import React, { useCallback, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Form, Input, Button, Upload, Space, message, Modal } from 'antd';

import { UploadOutlined } from '@ant-design/icons';

import { normFile, getFalse } from 'utils';

function VcfUpload({ createVcf }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = useCallback(
    ({ file, ...values }) => {
      new Promise((resolve, reject) => {
        setLoading(true);
        const params = {
          ...values,
          filetype: 'vcf',
        };
        createVcf(file[0], params, resolve, reject);
      }).then(
        (vcf) => {
          setLoading(false);
          message.success('Upload successful!');
          navigate(`../${vcf.id}`);
        },
        (error) => {
          setLoading(false);
          Modal.error({
            title: 'Error while uploading',
            content: error.toString(),
          });
        }
      );
    },
    [createVcf, navigate]
  );

  const onClickCancel = useCallback(() => navigate(-1), [navigate]);
  return (
    <>
      <h1>Upload a new reference VCF</h1>
      <Form layout="vertical" name="uploadvcf" onFinish={onFinish}>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message:
                'Please provide a brief description of the reference VCF!',
            },
          ]}
          extra="A brief description of the file, so that you can retrieve it in the future"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="file"
          label="Reference VCF"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            { required: true, message: 'Please select a reference VCF!' },
          ]}
        >
          <Upload name="file" beforeUpload={getFalse}>
            <Button icon={<UploadOutlined />}>Select file</Button>
          </Upload>
        </Form.Item>

        <div style={{ textAlign: 'center' }}>
          <Space>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
            <Button type="default" onClick={onClickCancel}>
              Cancel
            </Button>
          </Space>
        </div>
      </Form>
    </>
  );
}

export default VcfUpload;
