import React from "react";
import styles from "./logout.module.css";

const LogoutButton = ({ onClick }) => {
  return (
    <div className={styles.ButtonWrapper} onClick={onClick}>
      <button className="button is-rounded">Log out</button>
    </div>
  );
};

export default LogoutButton;
