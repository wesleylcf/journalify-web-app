import React, { useState } from "react";

interface MessageProps {
  isDanger: boolean;
  message: string;
  setHide: () => void;
}

const Message: React.FC<MessageProps> = ({ isDanger, message, setHide }) => {
  return (
    <article className={`message ${isDanger ? "is-danger" : "is-success"}`}>
      <div className="message-header">
        <p>{isDanger ? "ERROR" : "SUCCESS"}</p>
        <button
          className="delete"
          aria-label="delete"
          onClick={setHide}
        ></button>
      </div>
      <div className="message-body">{message}</div>
    </article>
  );
};

export default Message;
