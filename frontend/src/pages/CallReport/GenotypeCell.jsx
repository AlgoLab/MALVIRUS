import styles from './GenotypeCell.module.css';

function getColor(gq) {
  if (gq >= 100) return '#7bcd7b';
  if (gq >= 95) return '#a2d3a2';
  if (gq >= 70) return '#fae18b';
  return '#f29998';
}

function GenotypeCell({ value }) {
  if (!value) return value;
  const [gt, gq] = value;
  return (
    <div className={styles.cell}>
      <div className={styles.cellText}>
        {gt === 0 ? 0 : <b>{gt}</b>} ({gq})
      </div>
      <div
        className={styles.cellBar}
        style={{
          width: `${gq}%`,
          backgroundColor: getColor(gq),
        }}
      ></div>
    </div>
  );
}

export default GenotypeCell;
