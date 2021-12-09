import { combineReducers } from "redux";
import cellsReducer from "../reducers/cellsReducer";
import bundlesReducer from "./bundlesReducer";
import authReducer from "./authReducer";

const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer,
  auth: authReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
