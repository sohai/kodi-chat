import { createActions, handleActions } from 'redux-actions';
import { pending, rejected, fulfilled } from '../utils/redux/promise';
import { start, stop, subscribe } from '../providers/ws';
import proxy from '../providers/ws';
import usersHandler from './users';

const defaultState = {
  available: false,
  pending: false,
  error: null
};

const actions = createActions({
  START: start,
  STOP: stop
});

const startAndSubscribe = url => async dispatch => {
  try {
    await dispatch(actions.start(url));
    subscribe(proxy, 'init', ev => dispatch(usersHandler.actions.init(ev)));
  } catch (e) {
    // dispatch(actions.error('Error during connection :('));
  }
};

const toPendingState = state => ({
  ...state,
  error: null,
  pending: true
});
const toAvailableState = state => ({
  ...state,
  available: true,
  error: null,
  pending: false
});
const toDefaultState = () => defaultState;
const toRejectedState = () => ({
  ...defaultState,
  error: 'Error during connection :('
});

const reducer = handleActions(
  {
    [pending(actions.start)]: toPendingState,
    [rejected(actions.start)]: toRejectedState,
    [fulfilled(actions.start)]: toAvailableState,

    [pending(actions.stop)]: toPendingState,
    [rejected(actions.stop)]: toRejectedState,
    [fulfilled(actions.stop)]: toDefaultState
  },
  defaultState
);

export default {
  reducer,
  actions: {
    ...actions,
    startAndSubscribe
  }
};
