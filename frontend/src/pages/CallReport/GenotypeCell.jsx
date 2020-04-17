import React from 'react';

function getColor(gq) {
  const igq = +gq;
  if (igq >= 100) return '#7bcd7b';
  if (igq >= 95) return '#a2d3a2';
  if (igq >= 70) return '#fae18b';
  return '#f29998';
}

const margin = 8;
const cellStyle = {
  width: `calc(100% + ${2 * margin}px)`,
  margin: -margin,
  backgroundColor: '#fff',
};

function GenotypeCell({ value, record }) {
  if (!value || value.indexOf(':') === -1) return value;
  const [gt, gq] = value.split(':');
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
          {gt === '0' ? record.REF : <b>{record.ALT}</b>} ({gq})
        </abbr>
      </div>
    </div>
  );
}

export default GenotypeCell;
