import React from 'react';
import { Button } from 'antd';

import { btn } from './TableButton.module.css';

const defaultProps = {
  size: 'small',
  block: true,
  className: btn,
};

function TableButton(props) {
  return <Button {...defaultProps} {...props} />;
}

export default TableButton;
