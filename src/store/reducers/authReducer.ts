import produce from "immer";
import { ActionTypes } from "../action-types";
import { Actions } from "../actions";

interface AuthState {
  user: string | null;
  error: string | null;
  loading: boolean;
  signedUp: boolean;
}

const initialState: AuthState = {
  user: null,
  error: null,
  loading: false,
  signedUp: false,
};

const reducer = produce(
  (state: AuthState = initialState, action: Actions): AuthState => {
    switch (action.type) {
      case ActionTypes.SIGNUP_START:
      case ActionTypes.LOGIN_START:
      case ActionTypes.LOGOUT_START:
        state.loading = true;
        return state;
      case ActionTypes.SIGNUP_SUCCESS:
        state.loading = false;
        state.signedUp = true;
        state.error = null;
        return state;
      case ActionTypes.LOGIN_SUCCESS:
        state.user = action.payload.user;
        state.loading = false;
        state.error = null;
        return state;
      case ActionTypes.LOGOUT_SUCCESS:
        state.loading = false;
        state.error = null;
        state.signedUp = false;
        state.user = null;
        return state;
      case ActionTypes.SIGNUP_ERROR:
      case ActionTypes.LOGIN_ERROR:
        state.loading = false;
        state.error = action.payload.error;
        return state;

      default:
        return state;
    }
  },
  initialState
);

export default reducer;
