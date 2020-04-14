import React from 'react';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

function JobParameters({ params, PARAMS }) {
  return (
    <ul style={{ margin: 0 }}>
      {Object.keys(params).map((key) => (
        <li key={key}>
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
        </li>
      ))}
    </ul>
  );
}

export default JobParameters;
