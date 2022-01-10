import Message from "../LoginModal/Message/Message";

const ErrorModal = ({ error }) => {
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className={`modal-content`}>
        <Message
          isDanger
          message={`Critical Error "${error}". Please refresh the page`}
        />
      </div>
    </div>
  );
};

export default ErrorModal;
