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

import { decorate } from ".";

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
