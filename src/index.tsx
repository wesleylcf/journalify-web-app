import reactDOM from "react-dom";
import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import styles from "./index.module.css";
import "bulmaswatch/cyborg/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import CellList from "./containers/CellList/CellList";
import AlertBar from "./containers/AlertBar/AlertBar";
import Login from "./containers/Login/Login";
import { ReactComponent as Logo } from "./assets/logo.svg";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const hideModalHandler = () => setShowModal(false);
  return (
    <Provider store={store}>
      <div className={`${styles.App}`}>
        <AlertBar showModalHandler={() => setShowModal(true)} />
        <Logo className={styles.Logo} />
        <CellList />
        {showModal ? (
          <Login hideModalHandler={hideModalHandler} showModal={showModal} />
        ) : null}
      </div>
    </Provider>
  );
};

reactDOM.render(<App />, document.querySelector("#root"));
