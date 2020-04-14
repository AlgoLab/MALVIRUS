import React from 'react';

import { Button, Descriptions } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

import { api } from 'app-config';

import { ButtonPanel, Error, FName, Loading, StatusTag } from 'components';
import PARAMS from 'utils/call-params';

function JobParameters({ params }) {
  return (
    <ul style={{ margin: 0 }}>
      {Object.keys(params).map((key) => (
        <li key={key}>
          <b>{(PARAMS[key] && PARAMS[key].label) || key}:</b>{' '}
          {(PARAMS[key] &&
            PARAMS[key].render &&
            PARAMS[key].render(params[key])) ||
            params[key]}
        </li>
      ))}
    </ul>
  );
}

function BodyCall({ call }) {
  if (call.pending) return <Loading />;
  if (call.rejected) return <Error reason={call.reason} />;
  const { value } = call;
  return (
    <>
      <Descriptions bordered column={2}>
        <Descriptions.Item
          label={value.id !== value.alias ? 'Alias' : 'Alias / ID'}
          span={value.id !== value.alias ? 1 : 2}
        >
          {value.alias}
        </Descriptions.Item>
        {value.id !== value.alias && (
          <Descriptions.Item label="ID" span={1}>
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
        <Descriptions.Item label="Input file:" span={2}>
          {value.filename ? (
            <FName href={value.filename} />
          ) : (
            <i>No input files available</i>
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
        <Descriptions.Item label="Parameters" span={2}>
          <JobParameters params={value.params} />
        </Descriptions.Item>
        <Descriptions.Item label="Detailed log" span={2}>
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
        <Button type="primary" icon={<SyncOutlined />} onClick={reloadCall}>
          Refresh
        </Button>
      </ButtonPanel>
    </>
  );
}

export default Call;
