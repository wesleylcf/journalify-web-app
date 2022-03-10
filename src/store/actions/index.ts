import {
  MoveCellAction,
  DeleteCellAction,
  UpdateCellAction,
  InsertCellAfterAction,
  BundleStartAction,
  BundleCompleteAction,
  FetchCellsAction,
  FetchCellsCompleteAction,
  FetchCellsErrorAction,
  saveFileStartAction,
  saveFileCompleteAction,
  saveFileErrorAction,
} from "./cells";
import {
  LoginStartAction,
  LoginErrorAction,
  LoginSuccessAction,
  SignupErrorAction,
  SignupStartAction,
  SignupSuccessAction,
  LogoutStartAction,
  LogoutSuccessAction,
} from "./auth";

import {
  FetchFilesStartAction,
  FetchFilesSuccessAction,
  FetchFilesErrorAction,
  MakeFileActiveAction,
  MakeFileInactiveAction,
  MakeFileCurrentAction,
  CreateFileStartAction,
  CreateFileSuccessAction,
  CreateFileErrorAction,
  DeleteFileErrorAction,
  DeleteFileStartAction,
  DeleteFileSuccessAction,
  MoveFileStartAction,
  MoveFileSuccessAction,
  MoveFileErrorAction,
} from "./files";

export * from "./auth";
export * from "./cells";
export * from "./files";

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
  | DeleteFileSuccessAction
  | MoveFileStartAction
  | MoveFileSuccessAction
  | MoveFileErrorAction;
