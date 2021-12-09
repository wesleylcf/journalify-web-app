import React from 'react';
import styles from './saveStatus.module.css';

interface saveProps {
  saving: boolean;
}

const SaveStatus: React.FC<saveProps> = ({ saving }) => {
  return (
    <div className={styles.SaveStatusWrapper}>
      {saving ? (
        <div className={styles.SpinnerWrapper}>
          <div className={styles.Spinner}></div>
        </div>
      ) : (
        <div className={styles.SaveStatus}>
          <p>Saved</p>
        </div>
      )}
    </div>
  );
};

export default SaveStatus;
