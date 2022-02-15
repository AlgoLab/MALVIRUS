import { Fragment } from 'react';
import { FName } from 'components';

import styles from './SnakemakeLog.module.css';

function SnakemakeLog({ log }) {
  const lines = log.split('\n');
  return (
    <div className={styles.cnt}>
      <pre className={styles.pre}>
        {lines.map((line, i) => (
          <Fragment key={i}>
            {line.startsWith('==> /') ? (
              <b style={{ textDecoration: 'underline' }}>
                ==&gt; <FName href={line.slice(4, line.length - 4)} hideIcon />{' '}
                &lt;==
              </b>
            ) : (
              line
            )}
            {'\n'}
          </Fragment>
        ))}
      </pre>
    </div>
  );
}

export default SnakemakeLog;
