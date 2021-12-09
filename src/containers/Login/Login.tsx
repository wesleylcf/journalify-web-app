import { useState, useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Spinner from "../../components/Spinner/Spinner";
import Email from "./Email/Email";
import Password from "./Password/Password";
import FormButtons from "./FormButtons/FormButtons";
import Message from "./Message/Message";

const Login = ({ showModal, hideModalHandler }) => {
  const [emailInput, setEmailInput] = useState("wesleylinzefen@gmail.com");
  const [passwordInput, setPasswordInput] = useState("password");
  const [isLogin, setIsLogin] = useState(false);
  const [hideWarning, setHideWarning] = useState(false);
  const [hideSuccess, setHideSuccess] = useState(false);
  const [user, loading, error, signedUp] = useTypedSelector(
    ({ auth: { user, loading, error, signedUp } }) => [
      user,
      loading,
      error,
      signedUp,
    ]
  );
  const { signup, login } = useActions();
  const onSwitchLoginHandler = (e) => {
    e.preventDefault();
    setIsLogin(!isLogin);
  };

  useEffect(() => {
    if (user) hideModalHandler();
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (signedUp) setIsLogin(true);
  }, [signedUp]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (isLogin) login(emailInput, passwordInput);
    else signup(emailInput, passwordInput);
    setHideWarning(false);
    setHideSuccess(false);
  };

  return (
    <div className={`modal ${showModal ? "is-active" : ""}`}>
      {loading && <Spinner />}
      <div className="modal-background"></div>
      <div className="modal-content">
        <form onSubmit={(e) => onSubmitHandler(e)}>
          <Email emailInput={emailInput} setEmailInput={setEmailInput} />
          <Password
            passwordInput={passwordInput}
            setPasswordInput={setPasswordInput}
          />
          <FormButtons
            hideModalHandler={hideModalHandler}
            isLogin={isLogin}
            onSwitchLoginHandler={onSwitchLoginHandler}
          />
        </form>
        {error && !hideWarning && (
          <Message
            isDanger
            message={error}
            setHide={() => setHideWarning(true)}
          />
        )}
        {signedUp && !hideSuccess && (
          <Message
            isDanger={false}
            message="Successfully signed up! Please log in"
            setHide={() => setHideSuccess(true)}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
