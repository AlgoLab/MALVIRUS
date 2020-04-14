import React from 'react';

import { cnt } from './ButtonPanel.module.css';

function ButtonPanel({ children }) {
  return <div className={cnt}>{children}</div>;
}

export default ButtonPanel;
