import React, { useCallback, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  Form,
  Button,
  Upload,
  Space,
  message,
  Modal,
  InputNumber,
  Select,
  Spin,
} from 'antd';

import { UploadOutlined } from '@ant-design/icons';

import { normFile, getFalse } from 'utils';

function CallNew({ createCall, vcfs }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = useCallback(
    ({ file, ...values }) => {
      new Promise((resolve, reject) => {
        setLoading(true);
        createCall(file[0], values, resolve, reject);
      }).then(
        (call) => {
          setLoading(false);
          message.success('Job submission successful!');
          navigate(`../${call.id}`);
        },
        (error) => {
          setLoading(false);
          Modal.error({
            title: 'Error during job submission',
            content: error.toString(),
          });
        }
      );
    },
    [createCall, navigate]
  );

  const onClickCancel = useCallback(() => navigate(-1), [navigate]);
  if (vcfs.rejected) {
    return <div>Errore: {JSON.stringify(vcfs.reason)}</div>;
  }
  if (!vcfs.settled) {
    return <Spin>Loading reference VCFs</Spin>;
  }
  return (
    <>
      <h1>Perform a new variant call</h1>
      <Form
        initialValues={{
          minocc: 100,
          maxocc: 300,
          lenkmers: 35,
          maxmem: 4,
          cores: 4,
        }}
        layout="vertical"
        name="newvcf"
        onFinish={onFinish}
      >
        <Form.Item
          name="file"
          label="Sample sequences (FASTA/Q)"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            {
              required: true,
              message: 'Please select a set of sequences!',
            },
          ]}
        >
          <Upload name="file" beforeUpload={getFalse}>
            <Button icon={<UploadOutlined />}>Select file</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Reference VCF"
          name="vcf"
          rules={[
            {
              required: true,
              message: 'Please provide a valid number!',
            },
          ]}
          extra="This is the VCF that malva will use to call variants."
        >
          <Select>
            {vcfs.value.content.map((vcf) => (
              <Select.Option key={vcf.id} value={vcf.id}>
                {vcf.description}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Minimum number of occurrences"
          name="minocc"
          rules={[
            {
              required: true,
              message: 'Please provide a valid number!',
            },
          ]}
          extra="This is the lower threshold used to count kmers.  Kmers that appear less than this number of times will be removed from the input."
        >
          <InputNumber min={10} type="number" />
        </Form.Item>

        <Form.Item
          label="Maximum number of occurrences"
          name="maxocc"
          rules={[
            {
              required: true,
              message: 'Please provide a valid number!',
            },
          ]}
          extra="This is the upper threshold used to count kmers.  Kmers that appear more than this number of times will be removed from the input."
        >
          <InputNumber min={1} type="number" />
        </Form.Item>

        <Form.Item
          label={
            <>
              <i>k</i>-mer length
            </>
          }
          name="lenkmers"
          rules={[
            {
              required: true,
              message: 'Please provide a valid number!',
            },
          ]}
          extra="Length of the kmers that will be used by the tools.  A higher value will help to discern better between small repeated regions but will lower the occurrences of each kmer."
        >
          <InputNumber min={1} type="number" />
        </Form.Item>

        <Form.Item
          label="Maximum amount of memory used by KMC [GB]"
          name="maxmem"
          rules={[
            {
              required: true,
              message: 'Please provide a valid number!',
            },
          ]}
          extra="Maximum GB of memory used by KMC.  This value must be smaller than the amount of RAM available on your machine."
        >
          <InputNumber min={1} type="number" />
        </Form.Item>

        <Form.Item
          label="Number of cores"
          name="cores"
          rules={[
            {
              required: true,
              message: 'Please provide a valid number!',
            },
          ]}
          extra="The number of cores that can be used during the construction of the reference VCF"
        >
          <InputNumber min={1} type="number" />
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

export default CallNew;
