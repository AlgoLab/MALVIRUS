import styles from './ButtonPanel.module.css';

function ButtonPanel({ children, alignment }) {
  return (
    <div className={styles.cnt} style={{ textAlign: alignment || 'center' }}>
      {children}
    </div>
  );
}

export default ButtonPanel;
