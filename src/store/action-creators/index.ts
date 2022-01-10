import { ActionTypes } from "../action-types";
import { DirectionTypes, CellTypes, defaultCell } from "../types";
import {
  UpdateCellAction,
  MoveCellAction,
  DeleteCellAction,
  InsertCellAfterAction,
  Actions,
  MakeFileActiveAction,
  MakeFileInactiveAction,
  MakeFileCurrentAction,
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
import { defaultFile } from "..";

const auth = getAuth();

const decorate = (id: string, fileName: string) => `${id}_${fileName}`;

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

export const fetchFile = () => {
  return async (dispatch: Dispatch<Actions>, getState: () => RootState) => {
    dispatch({ type: ActionTypes.FETCH_CELLS });
    const {
      auth: {
        user: { id },
      },
      files: { activeTab },
    } = getState();
    try {
      let cells;
      if (id) {
        const fileRef = db.collection("files").doc(decorate(id, activeTab));
        const fileDoc = await fileRef.get();
        if (!fileDoc.exists) throw new Error("Could not fetch cells");
        cells = fileDoc.data().cells;
      } else cells = [defaultCell];
      dispatch({
        type: ActionTypes.FETCH_CELLS_COMPLETE,
        payload: {
          cells: cells,
          file: activeTab,
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

export const saveFile = () => {
  return async (dispatch: Dispatch<Actions>, getState: () => RootState) => {
    const {
      auth: {
        user: { id },
      },
      files: { activeTab },
    } = getState();
    const {
      files: { files },
    } = getState();
    const { order, data } = files[activeTab];
    const cells = order.map((id) => data[id]);
    try {
      dispatch({ type: ActionTypes.SAVE_CELLS_START });
      if (id) {
        // const userRef = db.collection("users").doc(user);
        // await userRef.set({ cells: cells }, { merge: true });
        await db
          .collection("files")
          .doc(decorate(id, activeTab))
          .set({ cells: cells }, { merge: true });
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

export const addFileToTabs = (fileName: string): MakeFileActiveAction => {
  return {
    type: ActionTypes.ADD_FILE_TO_TABS,
    payload: { fileName: fileName },
  };
};

export const removeFileFromTabs = (
  fileName: string
): MakeFileInactiveAction => {
  return {
    type: ActionTypes.REMOVE_FILE_FROM_TABS,
    payload: { fileName: fileName },
  };
};

export const makeFileActive = (fileName: string): MakeFileCurrentAction => {
  return {
    type: ActionTypes.MAKE_FILE_ACTIVE,
    payload: { fileName: fileName },
  };
};

export const fetchFiles = () => {
  return async (dispatch: Dispatch<Actions>, getState: () => RootState) => {
    dispatch({ type: ActionTypes.FETCH_FILES_START });
    const {
      auth: { user },
    } = getState();
    try {
      let files;
      if (user) {
        const userRef = db.collection("users").doc(user.id);
        const userDoc = await userRef.get();
        if (!userDoc.exists) throw new Error("Could not fetch files");
        files = userDoc.data().files;
      } else files = [defaultFile.name];
      dispatch({
        type: ActionTypes.FETCH_FILES_SUCCESS,
        payload: {
          files: files,
        },
      });
    } catch (e) {
      dispatch({
        type: ActionTypes.FETCH_FILES_ERROR,
        payload: { error: e.message },
      });
    }
  };
};

export const createFile = (fileName) => {
  return async (dispatch: Dispatch<Actions>, getState: () => RootState) => {
    dispatch({ type: ActionTypes.CREATE_FILE_START });
    const {
      auth: {
        user: { id },
      },
    } = getState();
    try {
      if (id) {
        const userRef = db.collection("users").doc(id);
        const userDoc = await userRef.get();
        if (!userDoc.exists) throw new Error("Could not fetch files");
        const files = userDoc.data().files;
        if (files.includes(fileName))
          throw new Error("A file with the given file name already exists");
        await db
          .collection("users")
          .doc(id)
          .set({ files: [...files, fileName] });
        await db
          .collection("files")
          .doc(decorate(id, fileName))
          .set({ cells: [defaultCell] });
      }

      dispatch({
        type: ActionTypes.CREATE_FILE_SUCCESS,
        payload: { name: fileName },
      });
    } catch (e) {
      dispatch({
        type: ActionTypes.CREATE_FILE_ERROR,
        payload: { error: e.message },
      });
    }
  };
};

export const deleteFile = (fileName) => {
  return async (dispatch: Dispatch<Actions>, getState: () => RootState) => {
    dispatch({ type: ActionTypes.DELETE_FILE_START });
    const {
      files: { files },
      auth: {
        user: { id },
      },
    } = getState();
    const filesArray = Object.keys(files);
    const fileIndex = filesArray.indexOf(fileName);
    filesArray.splice(fileIndex, 1);
    try {
      if (id) {
        await db.collection("users").doc(id).set({ files: filesArray });
        db.collection("files")
          .doc(decorate(id, fileName))
          .delete()
          .then(() => {
            dispatch({
              type: ActionTypes.DELETE_FILE_SUCCESS,
              payload: { fileName: fileName },
            });
          });
      }
    } catch (e) {
      dispatch({
        type: ActionTypes.DELETE_FILE_ERROR,
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
