import React from "react";
import styles from "./button.module.css";

const SubmitButton = ({ isLogin, hideModalHandler, onSwitchLoginHandler }) => {
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
          onClick={hideModalHandler}
        >
          Cancel
        </button>
      </div>
      <div className={`control ${styles.Link}`}>
        <a
          className="is-button is-rounded"
          onClick={(e) => onSwitchLoginHandler(e)}
        >
          {isLogin ? "Or create an account" : "Or log in"}
        </a>
      </div>
    </div>
  );
};

export default SubmitButton;
