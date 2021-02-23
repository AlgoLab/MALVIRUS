import { Fragment, useCallback } from 'react';

import { Button, Descriptions } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import TableIcon from '@2fd/ant-design-icons/lib/Table';

import { useNavigate } from 'react-router-dom';

import { api, JOB_STATUSES } from 'app-config';

import {
  ButtonPanel,
  Description,
  Error,
  FName,
  JobParameters,
  Loading,
  PangolinOutputDescription,
  StatusTag,
  SnakemakeLog,
} from 'components';
import PARAMS from 'utils/call-params';
import { submissionTimeRender } from 'utils/tables';

function BodyCall({ call }) {
  const navigate = useNavigate();
  const goToReport = useCallback(() => navigate('report'), [navigate]);
  if (call.pending) return <Loading />;
  if (call.rejected) return <Error reason={call.reason} />;
  const { value } = call;
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
        <Descriptions.Item label="Description:" span={2}>
          <Description description={value.description} />
        </Descriptions.Item>
        <Descriptions.Item label="Status:" span={2}>
          <StatusTag status={value.log.status} />
        </Descriptions.Item>
        <Descriptions.Item label="Submission time:" span={2}>
          {submissionTimeRender(value.submission_time)}
        </Descriptions.Item>
        <Descriptions.Item label="Last modified time:" span={2}>
          {value.log.last_time}
        </Descriptions.Item>
        <Descriptions.Item label="Input file:" span={2}>
          {value.filename ? (
            <FName href={value.filename} />
          ) : (
            <i>No input files available</i>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Output files:" span={2}>
          {value.log.output ? (
            <>
              {Object.keys(value.log.output).map((key) => (
                <Fragment key={key}>
                  <FName href={value.log.output[key]} />{' '}
                </Fragment>
              ))}
              <Button
                type="primary"
                size="small"
                icon={<TableIcon />}
                onClick={goToReport}
                ghost
              >
                Show in tabular form
              </Button>
            </>
          ) : (
            <i>No output files available (yet)</i>
          )}
        </Descriptions.Item>
        {value.internal_ref && value.internal_ref.pangolin && !value.pangolin && (
          <Descriptions.Item label="Lineage prediction:" span={2}>
            <i>Not performed (yet)</i>
          </Descriptions.Item>
        )}
        {value.pangolin && (
          <Descriptions.Item label="Lineage prediction:" span={2}>
            <PangolinOutputDescription
              labelClassName="sb"
              pred={value.pangolin}
            />
          </Descriptions.Item>
        )}
        <Descriptions.Item label="Parameters:" span={2}>
          <JobParameters params={value.params} PARAMS={PARAMS} />
        </Descriptions.Item>
        {value.snakemake && (
          <Descriptions.Item label="Job log:" span={2}>
            <SnakemakeLog log={value.snakemake} />
          </Descriptions.Item>
        )}
        <Descriptions.Item label="Detailed log:" span={2}>
          <a
            href={api.call(value.id)}
            target="_blank"
            rel="noopener noreferrer"
          >
            log.json
          </a>
        </Descriptions.Item>
      </Descriptions>
    </>
  );
}

function Call({ id, call, reloadCall }) {
  const noRefresh =
    call &&
    call.fulfilled &&
    call.value &&
    call.value.log &&
    JOB_STATUSES[call.value.log.status] &&
    JOB_STATUSES[call.value.log.status].final;
  return (
    <>
      <h1>
        Variant calling job{' '}
        <b>
          {(call && call.fulfilled && call.value && call.value.alias) || id}
        </b>
      </h1>
      <BodyCall call={call} />
      <ButtonPanel>
        <Button
          type="primary"
          icon={<SyncOutlined />}
          onClick={reloadCall}
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

export default Call;
