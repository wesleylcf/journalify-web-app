import styles from "./deleteFile.module.css";
import { useActions } from "../../hooks/useActions";
import { useContext } from "react";
import { ModalContext } from "../..";

const DeleteFileButton = ({ fileName }) => {
  const setDeleteFileNameHandler = useContext(ModalContext).deleteFile.handler;
  const { deleteFile } = useActions();
  return (
    <div className={styles.ButtonWrapper}>
      <button
        className="button is-rounded"
        onClick={() => setDeleteFileNameHandler(fileName)}
      >
        DELETE FILE
      </button>
    </div>
  );
};

export default DeleteFileButton;
