import React from 'react';
import { DownloadOutlined } from '@ant-design/icons';

function FName({ href, hideIcon = false }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {href.slice(href.lastIndexOf('/') + 1)}
      {!hideIcon && (
        <>
          {' '}
          <DownloadOutlined />
        </>
      )}
    </a>
  );
}

export default FName;
