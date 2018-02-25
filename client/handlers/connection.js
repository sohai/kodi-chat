import { createActions, handleActions } from 'redux-actions';
import { pending, rejected, fulfilled } from '../utils/redux/promise';
import { start, stop, subscribe } from '../providers/ws';
import proxy from '../providers/ws';
import usersHandler from './users';
import messageHandler from './messages';

const defaultState = {
  available: false,
  pending: true,
  error: null
};

const actions = createActions(
  {
    START: start,
    STOP: stop
  },
  'ERROR'
);

const startAndSubscribe = url => async dispatch => {
  try {
    await dispatch(actions.start(url));
    subscribe(proxy, 'init', ev => dispatch(usersHandler.actions.init(ev)));
    subscribe(proxy, 'maximum user number exceeded', () =>
      dispatch(actions.error('Too many user'))
    );
    subscribe(proxy, 'new message', msg =>
      dispatch(messageHandler.actions.incMessage(msg))
    );
    subscribe(proxy, 'joined', username =>
      dispatch(usersHandler.actions.join(username))
    );
    subscribe(proxy, 'new name', username =>
      dispatch(usersHandler.actions.contactName(username))
    );
    subscribe(proxy, 'oops', username =>
      dispatch(messageHandler.actions.removeUserLastMessage(username))
    );
    subscribe(proxy, 'typing', isTyping =>
      dispatch(usersHandler.actions.typing(isTyping))
    );
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
const toErrorState = (state, action) => ({
  ...state,
  error: action.payload
});

const reducer = handleActions(
  {
    [pending(actions.start)]: toPendingState,
    [rejected(actions.start)]: toRejectedState,
    [fulfilled(actions.start)]: toAvailableState,

    [pending(actions.stop)]: toPendingState,
    [rejected(actions.stop)]: toRejectedState,
    [fulfilled(actions.stop)]: toDefaultState,
    [actions.error]: toErrorState
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
