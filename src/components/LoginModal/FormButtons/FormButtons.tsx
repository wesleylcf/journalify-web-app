import React from "react";
import styles from "./button.module.css";

const SubmitButton = ({
  isLogin,
  hideLoginModalHandler,
  onSwitchLoginHandler,
}) => {
  return (
    <div className={`field is-grouped ${styles.Container}`}>
      <div className="control">
        <button className="button is-link is-rounded">
          {isLogin ? "Log in" : "Sign up"}
        </button>
      </div>
      <div className="control">
        <button
          className="button is-link is-light is-rounded"
          onClick={hideLoginModalHandler}
        >
          Cancel
        </button>
      </div>
      <div className={`control ${styles.Link}`}>
        <button
          className={`${styles.IsButton} is-button is-rounded`}
          onClick={(e) => onSwitchLoginHandler(e)}
        >
          {isLogin ? "Or create an account" : "Or log in"}
        </button>
      </div>
    </div>
  );
};

export default SubmitButton;
