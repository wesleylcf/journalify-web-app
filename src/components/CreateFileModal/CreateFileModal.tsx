import { useState, useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Spinner from "../Spinner/Spinner";
import styles from "./createFileModal.module.css";
import Message from "../LoginModal/Message/Message";

const CreateFileModal = ({ hideCreateFileModalHandler }) => {
  const [hideWarning, setHideWarning] = useState(false);
  const [fileNameInput, setFileNameInput] = useState("");
  const loading = useTypedSelector(({ files: { loading } }) => loading);
  const error = useTypedSelector(({ files: { error } }) => error);
  const files = useTypedSelector(({ files: { files } }) => files);
  const { createFile } = useActions();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    createFile(fileNameInput);
  };

  useEffect(() => {
    if (files.hasOwnProperty(fileNameInput)) hideCreateFileModalHandler();
  }, [files]);

  return (
    <div className={"modal is-active"}>
      {loading && <Spinner message="Creating file..." />}
      <div className="modal-background"></div>
      <div className="modal-content">
        <form onSubmit={(e) => onSubmitHandler(e)}>
          <div className="field">
            <label className="label">File name</label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="text"
                placeholder="name"
                value={fileNameInput}
                autoFocus
                onChange={(e) => setFileNameInput(e.target.value)}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-file"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-exclamation-triangle"></i>
              </span>
            </div>
          </div>
          <div className={`field is-grouped ${styles.Container}`}>
            <div className="control">
              <button className="button is-link is-rounded">Create file</button>
            </div>
            <div className="control">
              <button
                className="button is-link is-light is-rounded"
                onClick={hideCreateFileModalHandler}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
        {error && !hideWarning && (
          <Message
            isDanger
            message={error}
            setHide={() => setHideWarning(true)}
          />
        )}
      </div>
    </div>
  );
};

export default CreateFileModal;
