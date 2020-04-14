import React from 'react';

function FName({ href }) {
  const v = String(href);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {v.slice(v.lastIndexOf('/') + 1)}
    </a>
  );
}

export default FName;
