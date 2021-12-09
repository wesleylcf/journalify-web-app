import { createStore, applyMiddleware } from 'redux';
// import { ActionTypes } from '../store/action-types';
import { persistMiddleware } from './middlewares/persist-cells';
import thunk from 'redux-thunk';
import reducers from './reducers';

export const store = createStore(
  reducers,
  {},
  applyMiddleware(persistMiddleware, thunk)
);

// store.dispatch({
//   type: ActionTypes.INSERT_CELL_BEFORE,
//   payload: {
//     id: null,
//     type: 'code',
//   },
// });

// store.dispatch({
//   type: ActionTypes.INSERT_CELL_BEFORE,
//   payload: {
//     id: null,
//     type: 'markdown',
//   },
// });
