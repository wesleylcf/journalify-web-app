import React, { useEffect } from "react";
import TabBar from "./TabBar/TabBar";
import FilesTab from "./FilesTab/FilesTab";
import TabContent from "./TabContent/TabContent";
import CellList from "../CellList/CellList";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import { useActions } from "../../hooks/useActions";
import styles from "./fileInterface.module.css";
import Spinner from "../../components/Spinner/Spinner";
import { FilesState } from "../../store/reducers/filesReducer";
import { useMemo, useState } from "react";
import { usePrevious } from "../../hooks/usePrevious";
interface FileInterfaceProps extends Partial<FilesState> {
  user: {
    id: string;
    name: string;
  };
}

const FileInterface: React.FC<FileInterfaceProps> = ({
  user,
  tabs,
  files,
  activeTab,
}) => {
  const { logout, fetchFiles } = useActions();
  console.log(files, activeTab, files[activeTab]);
  const loading = activeTab ? files[activeTab].loading : false;
  const fileArray = Object.keys(files);
  const previousTabs = usePrevious(tabs);
  const content = useMemo(() => {
    let content = [];
    tabs.forEach((fileName, id) => {
      content[fileName] = <CellList fileName={fileName} />;
    });
    return content;
  }, [tabs]);

  useEffect(() => {
    fetchFiles();
  }, [user, fileArray.length]);

  return (
    <>
      {loading && <Spinner message="Fetching your files..." />}
      <article className="panel is-primary">
        <div className={`panel-heading ${styles.WelcomePanel}`}>
          <p>Welcome back {user.name}!</p>
          <LogoutButton onClick={() => logout(user.id)} />
        </div>
        <TabBar tabNames={tabs} activeTab={activeTab} />
        <TabContent>
          <FilesTab files={files} hidden={activeTab} />
          {activeTab && content[activeTab]}
        </TabContent>
      </article>
    </>
  );
};

export default React.memo(FileInterface);
