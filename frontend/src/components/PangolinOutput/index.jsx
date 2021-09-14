import { Fragment } from 'react';

import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import { FIELDS } from './utils';

function PangolinOutputDescription({ pred, labelClassName }) {
  return (
    <>
      {FIELDS.map(
        ({ name, label, extra, render }) =>
          pred[name] != null && (
            <Fragment key={name}>
              <b className={labelClassName}>{label || name}:</b>{' '}
              {render ? render(pred[name], pred) : pred[name]}{' '}
              {extra && (
                <>
                  {' '}
                  <Tooltip title={extra}>
                    <QuestionCircleOutlined />
                  </Tooltip>
                </>
              )}
              <br />
            </Fragment>
          )
      )}
      Lineage assignment is performed with PANGOLIN. See{' '}
      <a
        href="https://cov-lineages.org/resources/pangolin/output.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://cov-lineages.org/resources/pangolin/output.html
      </a>{' '}
      for details.
    </>
  );
}

export default PangolinOutputDescription;
