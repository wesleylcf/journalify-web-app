import React from "react";

interface MessageProps {
  isDanger: boolean;
  message: string;
  heading?: string;
  setHide?: () => void;
}

const Message: React.FC<MessageProps> = ({
  isDanger,
  message,
  setHide,
  heading,
  children,
}) => {
  return (
    <article className={`message ${isDanger ? "is-danger" : "is-success"}`}>
      <div className="message-header">
        {heading ? <p>{heading}</p> : <p>{isDanger ? "ERROR" : "SUCCESS"}</p>}
        {setHide && (
          <button className="delete" aria-label="delete" onClick={setHide} />
        )}
      </div>
      <div className="message-body">{children ? children : message}</div>
    </article>
  );
};

export default Message;
