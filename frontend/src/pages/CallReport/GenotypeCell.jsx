import React from 'react';

import { cell, cellText, cellBar } from './GenotypeCell.module.css';

function getColor(gq) {
  if (gq >= 100) return '#7bcd7b';
  if (gq >= 95) return '#a2d3a2';
  if (gq >= 70) return '#fae18b';
  return '#f29998';
}

function GenotypeCell({ value, record }) {
  if (!value) return value;
  const [gt, gq] = value;
  return (
    <div className={cell}>
      <div className={cellText}>
        <abbr title={value}>
          {gt === 0 ? 0 : <b>1</b>} ({gq})
        </abbr>
      </div>
      <div
        className={cellBar}
        style={{
          width: `${gq}%`,
          backgroundColor: getColor(gq),
        }}
      ></div>
    </div>
  );
}

export default GenotypeCell;
