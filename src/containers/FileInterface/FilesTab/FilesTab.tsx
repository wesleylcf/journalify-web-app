import React, { Fragment, useContext } from "react";
import FileTab from "./FileTab/FileTab";
import styles from "./filesTab.module.css";
import { ModalContext } from "../../..";

const FilesTab = ({ files, hidden }) => {
  const modalContext = useContext(ModalContext);
  const fileNames = Object.keys(files);
  const onCreateFileHandler = () => {
    modalContext.createFile.handler(true);
  };
  if (hidden) return null;
  return (
    <>
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            className="input is-primary"
            type="text"
            placeholder="Search"
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true"></i>
          </span>
        </p>
      </div>
      {fileNames.map((fileName, id) => (
        <FileTab key={`file_${fileName}`} file={files[fileName]} />
      ))}
      <a className="panel-block" onClick={onCreateFileHandler}>
        <span className="panel-icon">
          <i className={`${styles.AddFile} is-large fa-2x`} aria-hidden="true">
            +
          </i>
        </span>
        Create new file
      </a>
    </>
  );
};

export default React.memo(FilesTab);
