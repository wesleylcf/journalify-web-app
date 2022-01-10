import React from "react";
import { useActions } from "../../../../hooks/useActions";
import { File } from "../../../../store";
import styles from "./tab.module.css";

interface FileTabProps {
  file: File;
}
const FileTab: React.FC<FileTabProps> = ({ file }) => {
  const { addFileToTabs, makeFileActive } = useActions();
  const onClickFileHandler = (e) => {
    addFileToTabs(e.target.text);
    makeFileActive(e.target.text);
  };
  return (
    <a
      className={`panel-block ${file.opened ? styles.Disable : ""}`}
      onClick={onClickFileHandler}
    >
      <span className="panel-icon is-left">
        <i className="fas fa-book" aria-hidden="true"></i>
      </span>
      {file.name}
    </a>
  );
};

export default FileTab;
