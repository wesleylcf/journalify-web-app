import React from "react";

const Password = ({ passwordInput, setPasswordInput }) => {
  return (
    <div className="field">
      <label className="label">Password</label>
      <div className="control has-icons-left has-icons-right">
        <input
          className="input"
          type="password"
          placeholder="Email input"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <span className="icon is-small is-left">
          <i className="fas fa-envelope"></i>
        </span>
        <span className="icon is-small is-right">
          <i className="fas fa-exclamation-triangle"></i>
        </span>
      </div>
      <p className="help is-success">
        Try to include at least 8 characters including special characters and
        numbers
      </p>
    </div>
  );
};

export default Password;
