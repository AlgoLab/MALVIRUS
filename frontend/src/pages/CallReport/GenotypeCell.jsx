import React from 'react';

function getColor(gq) {
  if (gq >= 100) return '#7bcd7b';
  if (gq >= 95) return '#a2d3a2';
  if (gq >= 70) return '#fae18b';
  return '#f29998';
}

const margin = 8;
const cellStyle = {
  width: `calc(100% + ${2 * margin}px)`,
  margin: -margin,
  backgroundColor: '#fff',
};

function GenotypeCell({ value, record }) {
  if (!value) return value;
  const [gt, gq] = value;
  return (
    <div style={cellStyle}>
      <div
        style={{
          width: `${gq}%`,
          backgroundColor: getColor(gq),
          padding: margin,
        }}
      >
        <abbr title={value}>
          {gt === 0 ? 0 : <b>1</b>} ({gq})
        </abbr>
      </div>
    </div>
  );
}

export default GenotypeCell;
