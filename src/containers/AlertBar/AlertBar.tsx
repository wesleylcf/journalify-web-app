import { useState } from "react";
import styles from "./alertBar.module.css";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const AlertBar = ({ showModalHandler }) => {
  const [showAlertBar, setShowAlertBar] = useState(true);
  const dismissAlertBarHandler = () => {
    return setShowAlertBar(false);
  };
  const showAlertBarHandler = () => setShowAlertBar(true);
  const user = useTypedSelector(({ auth: { user } }) => user);
  const Warning = (
    <div className={`${styles.ExpandAlertBar}`}>
      <button
        className="icon has-text-danger is-large"
        onClick={showAlertBarHandler}
      >
        <i className="fas fa-exclamation-triangle is-large"></i>
      </button>
    </div>
  );
  if (user) return null;
  if (!user && showAlertBar)
    return (
      <article className="message is-danger" style={{ marginBottom: "0px" }}>
        <div className={`message-header ${styles.Container}`}>
          <span className="icon has-text-warning">
            <i className="fas fa-exclamation-triangle"></i>
          </span>
          <p>Data will not be saved unless you log in</p>
          <div className={styles.DismissOrLogin}>
            <button
              className={`button is-success is-light is-rounded ${styles.Button}`}
              onClick={showModalHandler}
            >
              Login
            </button>
            <button
              onClick={dismissAlertBarHandler}
              className={`delete is-large ${styles.Button}`}
              aria-label="delete"
            ></button>
          </div>
        </div>
      </article>
    );
  else return Warning;
};

export default AlertBar;
