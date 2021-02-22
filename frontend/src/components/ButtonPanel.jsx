import { cnt } from './ButtonPanel.module.css';

function ButtonPanel({ children, alignment }) {
  return (
    <div className={cnt} style={{ textAlign: alignment || 'center' }}>
      {children}
    </div>
  );
}

export default ButtonPanel;
