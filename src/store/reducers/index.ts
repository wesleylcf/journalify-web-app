import { combineReducers } from "redux";
import cellsReducer from "../reducers/cellsReducer";
import bundlesReducer from "./bundlesReducer";
import authReducer from "./authReducer";
import filesReducer from "./filesReducer";

const reducers = combineReducers({
  bundles: bundlesReducer,
  auth: authReducer,
  files: filesReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
