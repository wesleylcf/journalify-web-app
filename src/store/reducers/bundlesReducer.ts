import produce from 'immer';
import { ActionTypes } from '../action-types';
import { Actions } from '../actions';

interface BundlesState {
  [id: string]:
    | {
        isLoading: boolean;
        code: string;
        error: string;
      }
    | undefined;
}

const initialState: BundlesState = {};

const reducer = produce(
  (state: BundlesState = initialState, action: Actions): BundlesState => {
    switch (action.type) {
      case ActionTypes.BUNDLE_START:
        state[action.payload.cellId] = {
          isLoading: true,
          error: '',
          code: '',
        };
        return state;
      case ActionTypes.BUNDLE_COMPLETE:
        state[action.payload.cellId] = {
          isLoading: false,
          error: action.payload.bundle.error,
          code: action.payload.bundle.code,
        };
        return state;
      default:
        return state;
    }
  },
  initialState
);

export default reducer;
