import React from 'react';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

function JobParameters({ params, PARAMS }) {
  return (
    <>
      {Object.keys(params).map((key) => (
        <React.Fragment key={key}>
          <b>{(PARAMS[key] && PARAMS[key].label) || key}:</b>{' '}
          {(PARAMS[key] &&
            PARAMS[key].render &&
            PARAMS[key].render(params[key])) ||
            params[key]}{' '}
          {PARAMS[key] && PARAMS[key].extra && (
            <Tooltip title={PARAMS[key].extra}>
              <QuestionCircleOutlined />
            </Tooltip>
          )}
          <br />
        </React.Fragment>
      ))}
    </>
  );
}

export default JobParameters;
