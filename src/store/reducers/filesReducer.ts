import { ActionTypes } from "../action-types";
import { Actions } from "../actions";
import { Cell, File, defaultFile } from "../types";
import produce from "immer";

export interface FilesState {
  files: {
    [fileName: string]: File;
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
      case ActionTypes.SAVE_CELLS_START:
        state.files[state.activeTab].saving = true;
        state.files[state.activeTab].error = null;
        return state;
      case ActionTypes.SAVE_CELLS_COMPLETE:
        state.files[state.activeTab].saving = false;
        return state;
      case ActionTypes.SAVE_CELLS_ERROR:
        state.files[state.activeTab].saving = false;
        state.files[state.activeTab].error = action.payload.error;
        return state;
      case ActionTypes.FETCH_CELLS:
        state.loading = true;
        state.error = null;
        return state;
      case ActionTypes.FETCH_CELLS_COMPLETE:
        const { cells } = action.payload;
        state.loading = false;
        state.files[state.activeTab].order = cells.map((cell) => cell.id);
        state.files[state.activeTab].data = cells.reduce((accm, cell) => {
          accm[cell.id] = cell;
          return accm;
        }, {} as File["data"]);
        return state;
      case ActionTypes.FETCH_CELLS_ERROR:
        state.loading = false;
        state.error = action.payload.error;
        return state;
      case ActionTypes.UPDATE_CELL:
        const { id, content } = action.payload;
        state.files[state.activeTab].data[id].content = content;
        return state;
      case ActionTypes.MOVE_CELL:
        const { direction } = action.payload;
        const index = state.files[state.activeTab].order.findIndex(
          (id: string) => id === action.payload.id
        );
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (
          targetIndex < 0 ||
          targetIndex > state.files[state.activeTab].order.length - 1
        ) {
          return state;
        }
        state.files[state.activeTab].order[index] =
          state.files[state.activeTab].order[targetIndex];
        state.files[state.activeTab].order[targetIndex] = action.payload.id;
        return state;
      case ActionTypes.INSERT_CELL_AFTER:
        const cell: Cell = {
          content: "",
          type: action.payload.type,
          id: generateId(),
        };
        state.files[state.activeTab].data[cell.id] = cell;
        const indexBefore = state.files[state.activeTab].order.findIndex(
          (id) => id === action.payload.id
        );
        if (action.payload.id) {
          state.files[state.activeTab].order.splice(
            indexBefore + 1,
            0,
            cell.id
          );
        } else {
          state.files[state.activeTab].order.unshift(cell.id);
        }
        return state;
      case ActionTypes.DELETE_CELL:
        delete state.files[state.activeTab].data[action.payload.id];
        state.files[state.activeTab].order = state.files[
          state.activeTab
        ].order.filter((id: string) => id !== action.payload.id);
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
