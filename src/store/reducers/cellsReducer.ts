import { ActionTypes } from "../action-types";
import { Actions } from "../actions";
import { Cell } from "../types";
import produce from "immer";

export interface FileState {
  name: string;
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [id: string]: Cell;
  };
  saving: boolean;
  opened: boolean;
}

const initialState: FileState = {
  name: null,
  loading: false,
  error: null,
  order: [],
  data: {},
  saving: false,
  opened: false,
};

const reducer = produce(
  (state: FileState = initialState, action: Actions): FileState => {
    switch (action.type) {
      case ActionTypes.SAVE_CELLS_START:
        state.saving = true;
        return state;
      case ActionTypes.SAVE_CELLS_COMPLETE:
        state.saving = false;
        return state;
      case ActionTypes.SAVE_CELLS_ERROR:
        state.error = action.payload.error;
        return state;
      case ActionTypes.FETCH_CELLS:
        state.loading = true;
        state.error = null;
        return state;
      case ActionTypes.FETCH_CELLS_COMPLETE:
        const { cells } = action.payload;
        state.loading = false;
        state.order = cells.map((cell) => cell.id);
        state.data = cells.reduce((accm, cell) => {
          accm[cell.id] = cell;
          return accm;
        }, {} as FileState["data"]);
        return state;
      case ActionTypes.FETCH_CELLS_ERROR:
        state.loading = false;
        state.error = action.payload.error;
        return state;
      case ActionTypes.UPDATE_CELL:
        const { id, content } = action.payload;
        state.data[id].content = content;
        return state;
      case ActionTypes.MOVE_CELL:
        const { direction } = action.payload;
        const index = state.order.findIndex(
          (id: string) => id === action.payload.id
        );
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return state;
        }
        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;
        return state;
      case ActionTypes.INSERT_CELL_AFTER:
        const cell: Cell = {
          content: "",
          type: action.payload.type,
          id: generateId(),
        };
        state.data[cell.id] = cell;
        const indexBefore = state.order.findIndex(
          (id) => id === action.payload.id
        );
        if (action.payload.id) {
          state.order.splice(indexBefore + 1, 0, cell.id);
        } else {
          state.order.unshift(cell.id);
        }
        return state;
      case ActionTypes.DELETE_CELL:
        delete state.data[action.payload.id];
        state.order = state.order.filter(
          (id: string) => id !== action.payload.id
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
