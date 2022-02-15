import { Modal, Spin } from 'antd';

import styles from './PleaseWaitModal.module.css';

const spinStyle = { width: '100%' };
function PleaseWaitModal({ loading }) {
  return (
    <Modal
      title="Please wait..."
      visible={loading}
      closable={false}
      maskClosable={false}
      wrapClassName={styles.pwm}
    >
      <Spin
        size="large"
        style={spinStyle}
        tip={
          <>
            Performing submission...
            <br />
            Please do not close this page!
          </>
        }
      />
    </Modal>
  );
}

export default PleaseWaitModal;
