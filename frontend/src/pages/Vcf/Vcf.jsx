import { Fragment } from 'react';

import { Button, Descriptions } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

import { api, JOB_STATUSES } from 'app-config';

import {
  ButtonPanel,
  Description,
  Error,
  FName,
  JobParameters,
  Loading,
  StatusTag,
  SnakemakeLog,
} from 'components';
import PARAMS from 'utils/vcf-params';
import { submissionTimeRender } from 'utils/tables';

function BodyVcf({ vcf }) {
  if (vcf.pending) return <Loading />;
  if (vcf.rejected) return <Error reason={vcf.reason} />;
  const { value } = vcf;
  const isUploadOrPrecomp =
    value.log &&
    (value.log.status === 'Uploaded' || value.log.status === 'Precomputed');
  return (
    <>
      <Descriptions bordered column={2}>
        <Descriptions.Item
          label={value.id !== value.alias ? 'Alias:' : 'Alias / ID:'}
          span={value.id !== value.alias ? 1 : 2}
        >
          {value.alias}
        </Descriptions.Item>
        {value.id !== value.alias && (
          <Descriptions.Item label="ID:" span={1}>
            <code>{value.id}</code>
          </Descriptions.Item>
        )}
        <Descriptions.Item label="Description" span={2}>
          <Description description={value.description} />
        </Descriptions.Item>
        <Descriptions.Item label="Status" span={2}>
          <StatusTag status={value.log.status} />
        </Descriptions.Item>
        <Descriptions.Item label="Submission time:" span={2}>
          {submissionTimeRender(value.submission_time)}
        </Descriptions.Item>
        <Descriptions.Item label="Last modified time" span={2}>
          {value.log.last_time}
        </Descriptions.Item>
        <Descriptions.Item
          label={isUploadOrPrecomp ? 'Data:' : 'Input files:'}
          span={2}
        >
          <b className="sb">Reference genomic sequence:</b>{' '}
          <FName href={value.reference} />
          <br />
          <b className="sb">Gene annotation:</b>{' '}
          {value.gtf && value.gtf !== 'NULL' ? (
            <FName href={value.gtf} />
          ) : (
            <i>no annotation given</i>
          )}
          <br />
          {value.filename && (
            <>
              <b className="sb">Population genomic sequences:</b>{' '}
              <FName href={value.filename} />
              <br />
            </>
          )}
        </Descriptions.Item>
        {!isUploadOrPrecomp && (
          <Descriptions.Item label="Output files:" span={2}>
            {value.log.output ? (
              Object.keys(value.log.output).map((key) => (
                <Fragment key={key}>
                  <FName href={value.log.output[key]} />
                  <br />
                </Fragment>
              ))
            ) : (
              <i>No output files available</i>
            )}
          </Descriptions.Item>
        )}
        {value.params && (
          <Descriptions.Item label="Parameters:" span={2}>
            <JobParameters params={value.params} PARAMS={PARAMS} />
          </Descriptions.Item>
        )}
        {!isUploadOrPrecomp && value.snakemake && (
          <Descriptions.Item label="Job log:" span={2}>
            <SnakemakeLog log={value.snakemake} />
          </Descriptions.Item>
        )}
        <Descriptions.Item label="Detailed log:" span={2}>
          <a href={api.vcf(value.id)} target="_blank" rel="noopener noreferrer">
            log.json
          </a>
        </Descriptions.Item>
      </Descriptions>
    </>
  );
}

function Vcf({ id, vcf, reloadVcf }) {
  const noRefresh =
    vcf &&
    vcf.fulfilled &&
    vcf.value &&
    vcf.value.log &&
    JOB_STATUSES[vcf.value.log.status] &&
    JOB_STATUSES[vcf.value.log.status].final;
  return (
    <>
      <h1>
        Reference VCF{' '}
        <b>{(vcf && vcf.fulfilled && vcf.value && vcf.value.alias) || id}</b>
      </h1>
      <BodyVcf vcf={vcf} />
      <ButtonPanel>
        <Button
          type="primary"
          icon={<SyncOutlined />}
          onClick={reloadVcf}
          disabled={noRefresh}
          title={
            noRefresh
              ? 'Results are final. Refresh is not necessary.'
              : 'Refresh job status'
          }
        >
          Refresh
        </Button>
      </ButtonPanel>
    </>
  );
}

export default Vcf;
