import { ActionTypes } from "../action-types";

export interface LoginStartAction {
  type: ActionTypes.LOGIN_START;
}

export interface LoginSuccessAction {
  type: ActionTypes.LOGIN_SUCCESS;
  payload: {
    user: {
      id: string;
      name: string;
    };
  };
}

export interface LoginErrorAction {
  type: ActionTypes.LOGIN_ERROR;
  payload: {
    error: string;
  };
}

export interface SignupStartAction {
  type: ActionTypes.SIGNUP_START;
  payload: {
    email: string;
    password: string;
  };
}

export interface SignupSuccessAction {
  type: ActionTypes.SIGNUP_SUCCESS;
}

export interface SignupErrorAction {
  type: ActionTypes.SIGNUP_ERROR;
  payload: {
    error: string;
  };
}

export interface LogoutStartAction {
  type: ActionTypes.LOGOUT_START;
}

export interface LogoutSuccessAction {
  type: ActionTypes.LOGOUT_SUCCESS;
}
