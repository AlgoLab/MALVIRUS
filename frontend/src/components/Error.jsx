import { Alert, Modal } from 'antd';

import { stringifyError } from 'utils';

function Error({ reason }) {
  const message = stringifyError(reason);
  return (
    <Alert
      type="error"
      message="An error has occurred"
      description={
        <>
          <pre>{message}</pre>
          <p>
            Please <a href={window.location.href}>reload this page</a> and, if
            the error persists, open an issue.
          </p>
        </>
      }
      showIcon
      style={{ margin: '1em auto', maxWidth: '60em' }}
    />
  );
}

export function showError(error) {
  return new Promise((resolve) =>
    Modal.error({
      title: 'An error has occurred!',
      content: (
        <>
          <Alert message={stringifyError(error)} type="error" />
          <p>Please try again and, if the error persists, open an issue.</p>
        </>
      ),
      style: {
        minWidth: 500,
        maxWidth: 768,
      },
      width: '75%',
      onOk: (cb) => {
        resolve();
        cb();
      },
    })
  );
}

export default Error;
