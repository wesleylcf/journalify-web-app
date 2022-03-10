import React, { Fragment, useContext } from "react";
import FileTab from "./FileTab/FileTab";
import styles from "./filesTab.module.css";
import { ModalContext } from "../../..";
import { Files } from "../../../store/reducers/filesReducer";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { Droppable, Draggable } from "react-beautiful-dnd";

interface FilesTabprops {
  files: Files;
  activeTab: string;
}

const FilesTab: React.FC<FilesTabprops> = ({ files, activeTab }) => {
  const modalContext = useContext(ModalContext);
  const order = useTypedSelector(({ files: { fileOrder } }) => fileOrder);
  const onCreateFileHandler = () => {
    modalContext.createFile.handler(true);
  };
  if (activeTab !== null) return null;
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
      <a className="panel-block" onClick={onCreateFileHandler}>
        <span className="panel-icon">
          <i className={`${styles.AddFile} is-large fa-2x`} aria-hidden="true">
            +
          </i>
        </span>
        Create new file
      </a>
      <Droppable droppableId="fileTab">
        {(provided) => (
          <div ref={provided.innerRef}>
            {order.map((fileName, index) => (
              <Draggable
                key={`file_${fileName}`}
                draggableId={`file_${fileName}`}
                index={index}
              >
                {(provided) => (
                  <FileTab
                    file={files[fileName]}
                    dragRef={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  );
};

export default React.memo(FilesTab);
