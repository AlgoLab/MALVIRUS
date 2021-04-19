import { useCallback, useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';

import {
  Form,
  Button,
  Upload,
  message,
  InputNumber,
  Select,
  Input,
  Collapse,
  Alert,
} from 'antd';

import { UploadOutlined, PlusOutlined } from '@ant-design/icons';

import { defaultMalvaParams, JOB_STATUSES } from 'app-config';
import {
  ButtonPanel,
  Error,
  Loading,
  PleaseWaitModal,
  showError,
} from 'components';
import { normFile, getFalse } from 'utils';
import params from 'utils/call-params';
import { submissionTimeSorter } from 'utils/tables';

const maxoccValidator = ({ getFieldValue }) => ({
  validator(rule, value) {
    if (!value || getFieldValue('minocc') <= value) {
      return Promise.resolve();
    }
    return Promise.reject(
      <>
        {params.maxocc.label} cannot be smaller than {params.minocc.label}
      </>
    );
  },
});

const vcfsSorter = (a, b) => submissionTimeSorter(b, a);

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
          return showError(error);
        }
      );
    },
    [createCall, navigate]
  );

  const onClickCancel = useCallback(() => navigate(-1), [navigate]);

  const onClickNew = useCallback(() => navigate('/vcf/new'), [navigate]);
  const onClickUpload = useCallback(() => navigate('/vcf/upload'), [navigate]);

  if (vcfs.rejected) {
    return <Error reason={vcfs.reason} />;
  }
  if (!vcfs.fulfilled) {
    return <Loading />;
  }
  const okVcfs = vcfs.value.content.filter(
    ({ status }) => JOB_STATUSES[status] && JOB_STATUSES[status].success
  );
  if (okVcfs.length === 0) {
    return (
      <>
        <h1>Perform a new variant call</h1>
        <Alert
          type="warning"
          message="No reference VCF is available"
          description={
            <p>
              Please upload a reference VCF or build a new one in the{' '}
              <Link to="/vcf">Reference VCF</Link> section or wait for the
              completion of the running job if it has already been submitted.
            </p>
          }
          showIcon
          style={{ margin: '1em auto', maxWidth: '60em' }}
        />
      </>
    );
  }
  okVcfs.sort(vcfsSorter);
  return (
    <>
      <h1>Perform a new variant call</h1>
      <PleaseWaitModal loading={loading} />
      <Form
        initialValues={defaultMalvaParams}
        layout="vertical"
        name="newvcf"
        onFinish={onFinish}
      >
        <Form.Item
          label="Alias"
          name="alias"
          extra="An alias for the job, so that you can easily retrieve it in the future. Autogenerated if missing."
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: 'Please provide a brief description of the job!',
            },
          ]}
          extra="A brief description of the job, so that you can remember how it has been generated."
        >
          <Input.TextArea />
        </Form.Item>

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
          label={params.vcf.label}
          name="vcf"
          rules={[
            {
              required: true,
              message: 'Please provide reference VCF!',
            },
          ]}
          extra={
            <>
              {params.vcf.extra} Select a reference VCF above <b>or</b> use the
              buttons below to build or upload a new reference VCF.
              <ButtonPanel alignment="left">
                <Button icon={<PlusOutlined />} onClick={onClickNew}>
                  Build a new reference VCF from genomes
                </Button>
                <Button icon={<UploadOutlined />} onClick={onClickUpload}>
                  Upload a new reference VCF
                </Button>
              </ButtonPanel>
            </>
          }
        >
          <Select>
            {okVcfs.map((vcf) => (
              <Select.Option key={vcf.id} value={vcf.id}>
                {vcf.alias}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={params.minocc.label}
          name="minocc"
          rules={[
            {
              required: true,
              type: 'integer',
              message: 'Please provide a valid number!',
            },
          ]}
          extra={params.minocc.extra}
        >
          <InputNumber min={1} type="number" />
        </Form.Item>
        <Form.Item
          label={params.cores.label}
          name="cores"
          rules={[
            {
              required: true,
              type: 'integer',
              message: 'Please provide a valid number!',
            },
          ]}
          extra={params.cores.extra}
        >
          <InputNumber min={1} type="number" />
        </Form.Item>

        <Collapse>
          <Collapse.Panel header="Advanced parameters" key="adv" forceRender>
            <Form.Item
              label={params.maxocc.label}
              name="maxocc"
              dependencies={['minocc']}
              rules={[
                {
                  required: true,
                  type: 'integer',
                  message: 'Please provide a valid number!',
                },
                maxoccValidator,
              ]}
              extra={params.maxocc.extra}
            >
              <InputNumber min={1} type="number" />
            </Form.Item>

            <Form.Item
              label={params.malvak.label}
              name="malvak"
              rules={[
                {
                  required: true,
                  type: 'integer',
                  message: 'Please provide a valid number!',
                },
              ]}
              extra={params.malvak.extra}
            >
              <InputNumber min={1} type="number" />
            </Form.Item>

            <Form.Item
              label={params.maxmem.label}
              name="maxmem"
              rules={[
                {
                  required: true,
                  type: 'integer',
                  message: 'Please provide a valid number!',
                },
              ]}
              extra={params.maxmem.extra}
            >
              <InputNumber min={1} type="number" />
            </Form.Item>
          </Collapse.Panel>
        </Collapse>
        <ButtonPanel>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
          <Button type="default" onClick={onClickCancel}>
            Cancel
          </Button>
        </ButtonPanel>
      </Form>
    </>
  );
}

export default CallNew;
