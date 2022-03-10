import { ActionTypes } from "../action-types";
import { Actions } from "../actions";
import { defaultFile } from "../types";
import { FileState } from "./cellsReducer";
import cellsReducer from "./cellsReducer";
import produce from "immer";

export interface FilesState {
  files: {
    [fileName: string]: FileState;
  };
  activeTab: string | null;
  tabs: string[];
  loading: boolean;
  error: string | null;
  saving: boolean;
}

const initialState: FilesState = {
  loading: false,
  error: null,
  files: { intro: defaultFile },
  tabs: [],
  activeTab: "intro",
  saving: false,
};

const reducer = produce(
  (state: FilesState = initialState, action: Actions): FilesState => {
    switch (action.type) {
      case ActionTypes.LOGOUT_SUCCESS:
        state = initialState;
        return state;
      case ActionTypes.MAKE_FILE_ACTIVE:
        state.activeTab = action.payload.fileName || null;
        return state;
      case ActionTypes.ADD_FILE_TO_TABS:
        state.tabs.push(action.payload.fileName);
        state.files[action.payload.fileName].opened = true;
        return state;
      case ActionTypes.REMOVE_FILE_FROM_TABS:
        const fileIndex = state.tabs.indexOf(action.payload.fileName);
        state.tabs.splice(fileIndex, 1);
        state.files[action.payload.fileName].opened = false;
        return state;
      case ActionTypes.FETCH_FILES_START:
        state.loading = true;
        state.error = null;
        return state;
      case ActionTypes.FETCH_FILES_SUCCESS:
        state.loading = false;
        state.files = action.payload.files.reduce((accm, fileName) => {
          accm[fileName] = { ...defaultFile, name: fileName };
          return accm;
        }, {} as FilesState["files"]);
        return state;
      case ActionTypes.FETCH_FILES_ERROR:
        state.loading = false;
        state.error = action.payload.error;
        return state;

      case ActionTypes.CREATE_FILE_START:
        state.loading = true;
        state.error = null;
        return state;
      case ActionTypes.CREATE_FILE_SUCCESS:
        state.loading = false;
        state.files[action.payload.name] = {
          ...defaultFile,
          name: action.payload.name,
        };
        return state;
      case ActionTypes.CREATE_FILE_ERROR:
        state.loading = false;
        state.error = action.payload.error;
        return state;
      case ActionTypes.DELETE_FILE_START:
        state.loading = true;
        return state;
      case ActionTypes.DELETE_FILE_SUCCESS:
        state.loading = false;
        state.activeTab = null;
        delete state.files[action.payload.fileName];
        const deleteFileIndex = state.tabs.indexOf(action.payload.fileName);
        state.tabs.splice(deleteFileIndex, 1);
        return state;
      case ActionTypes.DELETE_FILE_ERROR:
        state.loading = false;
        state.error = action.payload.error;
        return state;

      // CELLS STATE START
      case ActionTypes.SAVE_CELLS_START:
      case ActionTypes.SAVE_CELLS_COMPLETE:
      case ActionTypes.SAVE_CELLS_ERROR:
      case ActionTypes.FETCH_CELLS:
      case ActionTypes.FETCH_CELLS_COMPLETE:
      case ActionTypes.FETCH_CELLS_ERROR:
      case ActionTypes.UPDATE_CELL:
      case ActionTypes.MOVE_CELL:
      case ActionTypes.INSERT_CELL_AFTER:
      case ActionTypes.DELETE_CELL:
        state.files[state.activeTab] = cellsReducer(
          state.files[state.activeTab],
          action
        );
        return state;
      default:
        return state;
    }
  },
  initialState
);

const generateId = () => {
  return Math.random().toString(36).substring(1, 7);
};

export default reducer;
