import { Fragment } from 'react';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

function JobParameters({ params, PARAMS }) {
  return (
    <>
      {Object.keys(params).map((key) => (
        <Fragment key={key}>
          <b className="sb">{(PARAMS[key] && PARAMS[key].label) || key}:</b>{' '}
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
        </Fragment>
      ))}
    </>
  );
}

export default JobParameters;
