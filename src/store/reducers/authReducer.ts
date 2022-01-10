import produce from "immer";
import { ActionTypes } from "../action-types";
import { Actions } from "../actions";

interface AuthState {
  user: { id: string | null; name: string | null };
  error: string | null;
  signingUp: boolean;
  loggingIn: boolean;
  loggingOut: boolean;
  signedUp: boolean;
}

const initialState: AuthState = {
  user: { id: null, name: null },
  error: null,
  signingUp: false,
  loggingIn: false,
  loggingOut: false,
  signedUp: false,
};

const reducer = produce(
  (state: AuthState = initialState, action: Actions): AuthState => {
    switch (action.type) {
      case ActionTypes.SIGNUP_START:
        state.signingUp = true;
        return state;
      case ActionTypes.LOGIN_START:
        state.loggingIn = true;
        return state;
      case ActionTypes.LOGOUT_START:
        state.error = null;
        state.loggingOut = true;
        return state;
      case ActionTypes.SIGNUP_SUCCESS:
        state.error = null;
        state.signingUp = false;
        state.signedUp = true;
        return state;
      case ActionTypes.LOGIN_SUCCESS:
        state.error = null;
        state.user = action.payload.user;
        state.loggingIn = false;
        return state;
      case ActionTypes.LOGOUT_SUCCESS:
        state.loggingOut = false;
        state.user = { id: null, name: null };
        return state;
      case ActionTypes.SIGNUP_ERROR:
        state.signingUp = false;
        state.error = action.payload.error;
        return state;
      case ActionTypes.LOGIN_ERROR:
        state.loggingIn = false;
        state.error = action.payload.error;
        return state;

      default:
        return state;
    }
  },
  initialState
);

export default reducer;
