import styles from "./spinner.module.css";

const Spinner = () => {
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className={`${styles.SpinnerWrapper} modal-content`}>
        <div className={styles.Spinner}></div>
      </div>
    </div>
  );
};

export default Spinner;
