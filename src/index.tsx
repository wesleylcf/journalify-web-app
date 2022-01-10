import reactDOM from "react-dom";
import React, { useState, useContext } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import styles from "./index.module.css";
import "bulmaswatch/cyborg/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AlertBar from "./components/AlertBar/AlertBar";
import LoginModal from "./components/LoginModal/LoginModal";
import { ReactComponent as Logo } from "./assets/logo.svg";
import MainWrapper from "./containers/MainWrapper/MainWrapper";
import CreateFileModal from "./components/CreateFileModal/CreateFileModal";
import ErrorModal from "./components/ErrorModal/ErrorModal";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal/ConfirmDeleteModal";

export const ModalContext = React.createContext({
  login: {
    value: false,
    handler: (value) => {},
  },
  createFile: {
    handler: (value) => {},
    value: false,
  },
  deleteFile: {
    handler: (value) => {},
    value: false,
  },
  error: {
    handler: (value) => {},
    value: null,
  },
});

const App = () => {
  const [showLoginModal, setshowLoginModal] = useState(false);
  const [showCreateFileModal, setShowCreateFileModal] = useState(false);
  const [deleteFileName, setdeleteFileName] = useState(null);
  const [error, setShowErrorModal] = useState(null);

  const hideLoginModalHandler = () => setshowLoginModal(false);
  const hideCreateFileModalHandler = () => setShowCreateFileModal(false);
  const hideDeleteFileModalHandler = () => setdeleteFileName(null);

  return (
    <Provider store={store}>
      <div className={`${styles.App}`}>
        <AlertBar showLoginModalHandler={() => setshowLoginModal(true)} />
        <Logo
          className={styles.Logo}
          width="20%"
          height="20%"
          preserveAspectRatio="none"
        />
        <ModalContext.Provider
          value={{
            login: {
              value: showLoginModal,
              handler: (value: boolean) => setshowLoginModal(value),
            },
            createFile: {
              value: showCreateFileModal,
              handler: (value) => setShowCreateFileModal(value),
            },
            deleteFile: {
              value: deleteFileName,
              handler: (value) => setdeleteFileName(value),
            },
            error: {
              handler: (value) => setShowErrorModal(value),
              value: error,
            },
          }}
        >
          <MainWrapper />
        </ModalContext.Provider>
        {showLoginModal && (
          <LoginModal hideLoginModalHandler={hideLoginModalHandler} />
        )}
        {showCreateFileModal && (
          <CreateFileModal
            hideCreateFileModalHandler={hideCreateFileModalHandler}
          />
        )}
        {error && <ErrorModal error={error} />}

        {deleteFileName && (
          <ConfirmDeleteModal
            fileName={deleteFileName}
            hideModal={hideDeleteFileModalHandler}
          />
        )}
      </div>
    </Provider>
  );
};

reactDOM.render(<App />, document.querySelector("#root"));
