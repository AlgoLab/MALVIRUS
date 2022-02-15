import { Button } from 'antd';

import styles from './TableButton.module.css';

const defaultProps = {
  size: 'small',
  block: true,
  className: styles.btn,
};

function TableButton(props) {
  return <Button {...defaultProps} {...props} />;
}

export default TableButton;
