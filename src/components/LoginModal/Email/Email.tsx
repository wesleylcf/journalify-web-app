const Email = ({ emailInput, setEmailInput }) => {
  return (
    <div className="field">
      <label className="label">Email</label>
      <div className="control has-icons-left has-icons-right">
        <input
          className="input"
          type="email"
          placeholder="Email input"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />
        <span className="icon is-small is-left">
          <i className="fas fa-envelope"></i>
        </span>
        <span className="icon is-small is-right">
          <i className="fas fa-exclamation-triangle"></i>
        </span>
      </div>
    </div>
  );
};

export default Email;
