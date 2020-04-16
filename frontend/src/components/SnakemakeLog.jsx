import React from 'react';
import { FName } from 'components';

import { cnt, pre } from './SnakemakeLog.module.css';

function SnakemakeLog({ log }) {
  const lines = log.split('\n');
  return (
    <div className={cnt}>
      <pre className={pre}>
        {lines.map((line, i) => (
          <React.Fragment key={i}>
            {line.startsWith('==> /') ? (
              <b style={{ textDecoration: 'underline' }}>
                ==&gt; <FName href={line.slice(4, line.length - 4)} hideIcon />{' '}
                &lt;==
              </b>
            ) : (
              line
            )}
            {'\n'}
          </React.Fragment>
        ))}
      </pre>
    </div>
  );
}

export default SnakemakeLog;
