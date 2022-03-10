import { useContext, useEffect } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import CellListOffline from "../CellListOffline/CellListOffline";
import FileInterface from "../FileInterface/FileInterface";
import { ModalContext } from "../..";
import Spinner from "../../components/Spinner/Spinner";

const MainWrapper = () => {
  const user = useTypedSelector(({ auth: { user } }) => user);
  const [files, tabs, activeTab, error, loading] = useTypedSelector(
    ({ files: { files, tabs, activeTab, error, loading } }) => [
      files,
      tabs,
      activeTab,
      error,
      loading,
    ]
  );
  const setErrorHandler = useContext(ModalContext).error.handler;
  useEffect(() => {
    setErrorHandler(error);
  }, [error]);

  return (
    <main>
      {user.id ? (
        <FileInterface
          user={user}
          files={files}
          tabs={tabs}
          activeTab={activeTab}
        />
      ) : (
        <CellListOffline />
      )}
      {loading && <Spinner message="Loading..." />}
    </main>
  );
};

export default MainWrapper;
