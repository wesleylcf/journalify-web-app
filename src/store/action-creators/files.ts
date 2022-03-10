import { ActionTypes } from "../action-types";
import { defaultCell } from "../types";
import {
  Actions,
  MakeFileActiveAction,
  MakeFileInactiveAction,
  MakeFileCurrentAction,
} from "../actions";
import { RootState } from "../reducers";
import { Dispatch } from "redux";
import db from "../../firebase.config";
import { defaultFile } from "..";

import { decorate } from ".";

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
