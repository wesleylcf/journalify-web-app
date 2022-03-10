import { ActionTypes } from "../action-types";

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

export interface MoveFileStartAction {
  type: ActionTypes.MOVE_FILE_START;
  payload: {
    src: number;
    dest: number;
  };
}

export interface MoveFileSuccessAction {
  type: ActionTypes.MOVE_FILE_SUCCESS;
}

export interface MoveFileErrorAction {
  type: ActionTypes.MOVE_FILE_ERROR;
  payload: { error: string };
}
