import { ActionTypes } from "../action-types";
import { defaultCell } from "../types";
import { Actions } from "../actions";
import { Dispatch } from "redux";
import db from "../../firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { decorate } from "./index";

const auth = getAuth();

export const signup = (email: string, password: string) => {
  return async (dispatch: Dispatch<Actions>) => {
    dispatch({
      type: ActionTypes.SIGNUP_START,
      payload: {
        email: email,
        password: password,
      },
    });
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const userId = userCredential.user.uid;
        await db
          .collection("users")
          .doc(userId)
          .set({
            // cells: [defaultCell],
            files: ["intro"],
            email: email,
          });
        await db
          .collection("files")
          .doc(decorate(userId, "intro"))
          .set({ cells: [defaultCell] });
        dispatch({
          type: ActionTypes.SIGNUP_SUCCESS,
        });
        signOut(auth); //to work-around firebase unexpected error email already exists(due to multiple requests?)
      })
      .catch((e) => {
        dispatch({
          type: ActionTypes.SIGNUP_ERROR,
          payload: { error: "Invalid email or password. Please try again." },
        });
      });
  };
};

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch<Actions>) => {
    dispatch({
      type: ActionTypes.LOGIN_START,
      payload: {
        email: email,
        password: password,
      },
    });
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userId = userCredential.user.uid;
        const name = email.substring(0, email.lastIndexOf("@"));
        dispatch({
          type: ActionTypes.LOGIN_SUCCESS,
          payload: { user: { id: userId, name: name } },
        });
        dispatch({
          type: ActionTypes.MAKE_FILE_ACTIVE,
          payload: { fileName: null },
        });
      })
      .catch((error) => {
        dispatch({
          type: ActionTypes.LOGIN_ERROR,
          payload: { error: "Invalid email or password. Please try again." },
        });
      });
  };
};

export const logout = (user: string) => {
  return async (dispatch: Dispatch<Actions>) => {
    dispatch({ type: ActionTypes.LOGOUT_START });
    signOut(auth).then(() => {
      dispatch({ type: ActionTypes.LOGOUT_SUCCESS });
    });
  };
};
