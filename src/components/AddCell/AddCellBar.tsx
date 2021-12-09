import React from 'react';
import { useActions } from '../../hooks/useActions';
import { CellTypes } from '../../store';
import styles from './addCell.module.css';

interface AddCellBarProps {
  prevId: string | null;
  forceVisible?: boolean;
}

const AddCellBar: React.FC<AddCellBarProps> = ({ forceVisible, prevId }) => {
  const { insertCellAfter } = useActions();
  const onAddHandler = (type: CellTypes) => {
    insertCellAfter(prevId, type);
  };
  return (
    <div
      className={`${styles.AddCell} ${forceVisible ? styles.ForceVisible : ''}`}
    >
      <div className={styles.Buttons}>
        <button
          className={`button is-rounded is-primary is-small ${styles.Button}`}
          onClick={() => onAddHandler('markdown')}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Text</span>
        </button>
        <button
          className={`button is-rounded is-primary is-small ${styles.Button}`}
          onClick={() => {
            onAddHandler('code');
          }}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Code</span>
        </button>
      </div>
      <div className={styles.Divider}></div>
    </div>
  );
};

export default AddCellBar;
