import React from 'react';
import { useActions } from '../../../hooks/useActions';
import styles from './toolBar.module.css';

interface ToolBarProps {
  id: string;
}

const ToolBar: React.FC<ToolBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();
  return (
    <div className={styles.ToolBar}>
      <button
        className={`button is-primary is-small ${styles.Button}`}
        onClick={() => moveCell(id, 'up')}
      >
        <span className="icon">
          <i className="fas fa-arrow-up"></i>
        </span>
      </button>
      <button
        className={`button is-primary is-small ${styles.Button}`}
        onClick={() => moveCell(id, 'down')}
      >
        <span className="icon">
          <i className="fas fa-arrow-down"></i>
        </span>
      </button>
      <button
        className={`button is-primary is-small ${styles.Button}`}
        onClick={() => deleteCell(id)}
      >
        <span className="icon">
          <i className="fas fa-times"></i>
        </span>
      </button>
    </div>
  );
};

export default ToolBar;
