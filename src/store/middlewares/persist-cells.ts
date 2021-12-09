import { Dispatch } from 'redux';
import { saveCells } from '../action-creators';
import { ActionTypes } from '../action-types';
import { Actions } from '../actions';
import { RootState } from '../reducers';

export const persistMiddleware = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Actions>;
  getState: () => RootState;
}) => {
  let timer: any;
  return (next: (action: Actions) => void) => {
    return (action: Actions) => {
      next(action);
      if (
        [
          ActionTypes.MOVE_CELL,
          ActionTypes.DELETE_CELL,
          ActionTypes.INSERT_CELL_AFTER,
          ActionTypes.UPDATE_CELL,
        ].includes(action.type)
      ) {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          saveCells()(dispatch, getState);
        }, 1000);
      }
    };
  };
};
