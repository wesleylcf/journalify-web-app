import { useState, useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Spinner from "../Spinner/Spinner";
import Email from "./Email/Email";
import Password from "./Password/Password";
import FormButtons from "./FormButtons/FormButtons";
import Message from "./Message/Message";

const LoginModal = ({ hideLoginModalHandler }) => {
  const [emailInput, setEmailInput] = useState("wesleylinzefen@gmail.com");
  const [passwordInput, setPasswordInput] = useState("password");
  const [isLogin, setIsLogin] = useState(false);
  const [hideWarning, setHideWarning] = useState(false);
  const [hideSuccess, setHideSuccess] = useState(false);
  const [user, error, loggingIn, loggingOut, signingUp, signedUp] =
    useTypedSelector(
      ({
        auth: { user, error, loggingIn, loggingOut, signingUp, signedUp },
      }) => [user, error, loggingIn, loggingOut, signingUp, signedUp]
    );
  const { signup, login } = useActions();
  const onSwitchLoginHandler = (e) => {
    e.preventDefault();
    setIsLogin(!isLogin);
    setHideWarning(true);
    setHideSuccess(true);
  };

  useEffect(() => {
    if (user.id) hideLoginModalHandler();
    // eslint-disable-next-line
  }, [user.id]);

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
    <div className={"modal is-active"}>
      {signingUp && <Spinner message="Signing up..." />}
      {loggingIn && <Spinner message="Logging in..." />}
      <div className="modal-background"></div>
      <div className="modal-content">
        <form onSubmit={(e) => onSubmitHandler(e)}>
          <Email emailInput={emailInput} setEmailInput={setEmailInput} />
          <Password
            passwordInput={passwordInput}
            setPasswordInput={setPasswordInput}
          />
          <FormButtons
            hideLoginModalHandler={hideLoginModalHandler}
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

export default LoginModal;
