import { ActionTypes } from "../action-types";
import { CellTypes, DirectionTypes, Cell } from "../types";

export interface MoveCellAction {
  type: ActionTypes.MOVE_CELL;
  payload: {
    id: string;
    direction: DirectionTypes;
  };
}

export interface DeleteCellAction {
  type: ActionTypes.DELETE_CELL;
  payload: {
    id: string;
  };
}

export interface UpdateCellAction {
  type: ActionTypes.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export interface InsertCellAfterAction {
  type: ActionTypes.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
    type: CellTypes;
  };
}

export interface BundleStartAction {
  type: ActionTypes.BUNDLE_START;
  payload: {
    cellId: string;
  };
}

export interface BundleCompleteAction {
  type: ActionTypes.BUNDLE_COMPLETE;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      error: string;
    };
  };
}

export interface FetchCellsAction {
  type: ActionTypes.FETCH_CELLS;
}

export interface FetchCellsCompleteAction {
  type: ActionTypes.FETCH_CELLS_COMPLETE;
  payload: { cells: Cell[] };
}

export interface FetchCellsErrorAction {
  type: ActionTypes.FETCH_CELLS_ERROR;
  payload: {
    error: string;
  };
}

export interface saveFileStartAction {
  type: ActionTypes.SAVE_CELLS_START;
}

export interface saveFileCompleteAction {
  type: ActionTypes.SAVE_CELLS_COMPLETE;
}

export interface saveFileErrorAction {
  type: ActionTypes.SAVE_CELLS_ERROR;
  payload: {
    error: string;
  };
}

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

export interface FetchFilesStartAction {
  type: ActionTypes.FETCH_FILES_START;
}

export interface FetchFilesSuccessAction {
  type: ActionTypes.FETCH_FILES_SUCCESS;
  payload: {
    files: string[];
  };
}

export interface FetchFilesErrorAction {
  type: ActionTypes.FETCH_FILES_ERROR;
  payload: {
    error: string;
  };
}

export interface MakeFileActiveAction {
  type: ActionTypes.ADD_FILE_TO_TABS;
  payload: { fileName: string };
}

export interface MakeFileInactiveAction {
  type: ActionTypes.REMOVE_FILE_FROM_TABS;
  payload: { fileName: string };
}

export interface MakeFileCurrentAction {
  type: ActionTypes.MAKE_FILE_ACTIVE;
  payload: { fileName: string };
}

export interface CreateFileStartAction {
  type: ActionTypes.CREATE_FILE_START;
}

export interface CreateFileSuccessAction {
  type: ActionTypes.CREATE_FILE_SUCCESS;
  payload: {
    name: string;
  };
}

export interface CreateFileErrorAction {
  type: ActionTypes.CREATE_FILE_ERROR;
  payload: { error: string };
}

export interface DeleteFileStartAction {
  type: ActionTypes.DELETE_FILE_START;
}

export interface DeleteFileSuccessAction {
  type: ActionTypes.DELETE_FILE_SUCCESS;
  payload: {
    fileName: string;
  };
}

export interface DeleteFileErrorAction {
  type: ActionTypes.DELETE_FILE_ERROR;
  payload: { error: string };
}

export type Actions =
  | MoveCellAction
  | DeleteCellAction
  | UpdateCellAction
  | InsertCellAfterAction
  | BundleStartAction
  | BundleCompleteAction
  | FetchCellsAction
  | FetchCellsCompleteAction
  | FetchCellsErrorAction
  | saveFileStartAction
  | saveFileCompleteAction
  | saveFileErrorAction
  | LoginStartAction
  | LoginErrorAction
  | LoginSuccessAction
  | SignupErrorAction
  | SignupStartAction
  | SignupSuccessAction
  | LogoutStartAction
  | LogoutSuccessAction
  | FetchFilesStartAction
  | FetchFilesSuccessAction
  | FetchFilesErrorAction
  | MakeFileActiveAction
  | MakeFileInactiveAction
  | MakeFileCurrentAction
  | CreateFileStartAction
  | CreateFileSuccessAction
  | CreateFileErrorAction
  | DeleteFileErrorAction
  | DeleteFileStartAction
  | DeleteFileSuccessAction;
