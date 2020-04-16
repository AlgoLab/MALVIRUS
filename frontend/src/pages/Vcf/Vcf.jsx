import React from 'react';

import { Button, Descriptions, Tooltip } from 'antd';
import { SyncOutlined, QuestionCircleOutlined } from '@ant-design/icons';

import { api } from 'app-config';

import {
  ButtonPanel,
  Error,
  FName,
  JobParameters,
  Loading,
  StatusTag,
  SnakemakeLog,
} from 'components';
import PARAMS from 'utils/vcf-params';

function BodyVcf({ vcf }) {
  if (vcf.pending) return <Loading />;
  if (vcf.rejected) return <Error reason={vcf.reason} />;
  const { value } = vcf;
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
          {value.description}
        </Descriptions.Item>
        <Descriptions.Item label="Status" span={2}>
          <StatusTag status={value.log.status} />
        </Descriptions.Item>
        <Descriptions.Item label="Last modified time" span={2}>
          {value.log.last_time}
        </Descriptions.Item>
        <Descriptions.Item label="Input files:" span={2}>
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
        <Descriptions.Item label="Output files:" span={2}>
          {value.log.output ? (
            Object.keys(value.log.output).map((key) => (
              <React.Fragment key={key}>
                <FName href={value.log.output[key]} />
                <br />
              </React.Fragment>
            ))
          ) : (
            <i>No output files available</i>
          )}
        </Descriptions.Item>
        {value.params && (
          <Descriptions.Item label="Parameters:" span={2}>
            <JobParameters params={value.params} PARAMS={PARAMS} />
          </Descriptions.Item>
        )}
        {value.snakemake && (
          <Descriptions.Item
            label={
              <>
                Job log:{' '}
                <Tooltip title="Only the last lines are presented. Click on the filename for the full log.">
                  <QuestionCircleOutlined />
                </Tooltip>
              </>
            }
            span={2}
          >
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
    (vcf.value.log.status === 'Completed' ||
      vcf.value.log.status === 'Uploaded');
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
