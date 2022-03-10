import Spinner from "../Spinner/Spinner";
import Message from "../LoginModal/Message/Message";

interface ConfirmModalProps {
  isDanger: boolean;
  message: string;
  heading: string;
  onCancel: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isDanger,
  message,
  heading,
  onCancel,
  onConfirm,
  loading,
}) => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
    onConfirm();
  };

  return (
    <div className={"modal is-active"}>
      {loading && <Spinner message="Loading..." />}
      <div className="modal-background"></div>
      <div className="modal-content">
        <form onSubmit={(e) => onSubmitHandler(e)}>
          <Message isDanger={isDanger} heading={heading} message={message}>
            <div className={`field is-grouped`}>
              <div className="control">
                <button
                  className="button is-link is-rounded"
                  onClick={onConfirm}
                >
                  Confirm
                </button>
              </div>
              <div className="control">
                <button
                  className="button is-link is-light is-rounded"
                  onClick={onCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Message>
        </form>
      </div>
    </div>
  );
};

export default ConfirmModal;
