import styles from "./spinner.module.css";
import React from "react";

interface SpinnerProps {
  message?: string;
}

const getRandomColorClassname = () => {
  const colors = [styles.ColorDefault, styles.Color1, styles.Color2];
  const index = Math.floor(Math.random() * 3);
  return colors[index];
};

const Spinner: React.FC<SpinnerProps> = ({ message }) => {
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className={`modal-content ${styles.Wrapper}`}>
        <h1 className={`${styles.Message} ${getRandomColorClassname()}`}>
          {message}
        </h1>
        <div className={`${styles.SpinnerWrapper} modal-content`}>
          <div className={styles.Spinner}></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
