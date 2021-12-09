import { ActionTypes } from "../action-types";
import { DirectionTypes, CellTypes, defaultCell } from "../types";
import {
  UpdateCellAction,
  MoveCellAction,
  DeleteCellAction,
  InsertCellAfterAction,
  Actions,
} from "../actions";
import { RootState } from "../reducers";
import bundle from "../../bundler";
import { Dispatch } from "redux";
import db from "../../firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const auth = getAuth();

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionTypes.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};
export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionTypes.DELETE_CELL,
    payload: {
      id,
    },
  };
};
export const moveCell = (
  id: string,
  direction: DirectionTypes
): MoveCellAction => {
  return {
    type: ActionTypes.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};
export const insertCellAfter = (
  id: string | null,
  cellType: CellTypes
): InsertCellAfterAction => {
  return {
    type: ActionTypes.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType,
    },
  };
};

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Actions>) => {
    dispatch({
      type: ActionTypes.BUNDLE_START,
      payload: {
        cellId: cellId,
      },
    });
    const result = await bundle(input);
    dispatch({
      type: ActionTypes.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result,
      },
    });
  };
};

export const fetchCells = () => {
  return async (dispatch: Dispatch<Actions>, getState: () => RootState) => {
    dispatch({ type: ActionTypes.FETCH_CELLS });
    const {
      auth: { user },
    } = getState();
    try {
      let cells;
      if (user) {
        const userRef = db.collection("users").doc(user);
        const userDoc = await userRef.get();
        if (!userDoc.exists) throw new Error("Could not fetch cells");
        cells = userDoc.data().cells;
      } else cells = [defaultCell];
      dispatch({
        type: ActionTypes.FETCH_CELLS_COMPLETE,
        payload: {
          cells: cells,
        },
      });
    } catch (e) {
      dispatch({
        type: ActionTypes.FETCH_CELLS_ERROR,
        payload: { error: e.message },
      });
    }
  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<Actions>, getState: () => RootState) => {
    const {
      cells: { data, order },
      auth: { user },
    } = getState();
    const cells = order.map((id) => data[id]);
    try {
      dispatch({ type: ActionTypes.SAVE_CELLS_START });
      if (user) {
        const userRef = db.collection("users").doc(user);
        await userRef.set({ cells: cells }, { merge: true });
      }
      dispatch({ type: ActionTypes.SAVE_CELLS_COMPLETE });
    } catch (e) {
      dispatch({
        type: ActionTypes.SAVE_CELLS_ERROR,
        payload: {
          error: e.message,
        },
      });
    }
  };
};

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
            cells: [defaultCell],
          });
        dispatch({
          type: ActionTypes.SIGNUP_SUCCESS,
        });
        signOut(auth); //to work-around firebase unexpected error email already exists(due to multiple requests?)
      })
      .catch((e) => {
        dispatch({
          type: ActionTypes.SIGNUP_ERROR,
          payload: { error: "Email already in use. Please try another" },
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
        dispatch({
          type: ActionTypes.LOGIN_SUCCESS,
          payload: { user: userId },
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
    signOut(auth).then(() => dispatch({ type: ActionTypes.LOGOUT_SUCCESS }));
  };
};
