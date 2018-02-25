import { createActions, handleActions, combineActions } from 'redux-actions';
import findLastIndex from 'lodash/findLastIndex';
import proxy from '../providers/ws';

const defaultState = [];

const actions = createActions(
  'ADD_MESSAGE',
  'INC_MESSAGE',
  'REMOVE_USER_LAST_MESSAGE'
);
const removeMyLastMessage = username => dispatch => {
  dispatch(actions.removeUserLastMessage(username));
  proxy.emit('oops');
};
const addAndSendMessage = (msg, username, variant = 'normal') => dispatch => {
  const item = { message: msg, username, variant };
  dispatch(actions.addMessage(item));
  proxy.emit('new message', item);
};

const addMessage = (state, action) => {
  return [...state, action.payload];
};
const removeUserLastMessage = (state, action) => {
  const idx = findLastIndex(state, item => item.username === action.payload);
  return [...state.slice(0, idx), ...state.slice(idx + 1)];
};

const reducer = handleActions(
  {
    [combineActions(actions.addMessage, actions.incMessage)]: addMessage,
    [actions.removeUserLastMessage]: removeUserLastMessage
  },
  defaultState
);

export default {
  reducer,
  actions: {
    ...actions,
    removeMyLastMessage,
    addAndSendMessage
  }
};
