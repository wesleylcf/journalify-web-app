import React, { Fragment } from "react";
import { useActions } from "../../../hooks/useActions";

const TabBar = ({ tabNames, activeTab }) => {
  const { removeFileFromTabs, makeFileActive } = useActions();

  const onCloseTabHandler = (e) => {
    const fileName = e.target.value;
    removeFileFromTabs(fileName);
    let nextActiveTab = null;
    if (tabNames.length > 1) {
      const nextTabIndex = tabNames.indexOf(fileName) - 1;
      nextActiveTab = tabNames[nextTabIndex];
    }
    makeFileActive(nextActiveTab);
  };
  const onClickTabHandler = (e) => {
    let nextActiveTab = null;
    if (e.target.text !== "Files") nextActiveTab = e.target.text;
    makeFileActive(nextActiveTab);
  };
  return (
    <p className="panel-tabs">
      <a className={activeTab ? "" : "is-active"} onClick={onClickTabHandler}>
        Files
      </a>
      {tabNames.map((file, id) => (
        <Fragment key={`tab_${file}`}>
          <a
            className={activeTab === file ? "is-active" : ""}
            onClick={onClickTabHandler}
          >
            {file}
            <button
              className="delete is-danger"
              style={{ marginLeft: "5px" }}
              onClick={onCloseTabHandler}
              value={file}
            />
          </a>
        </Fragment>
      ))}
    </p>
  );
};

export default React.memo(TabBar);
