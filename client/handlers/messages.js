import { createActions, handleActions, combineActions } from 'redux-actions';

const defaultState = [];

const actions = createActions('ADD_MESSAGE', 'INC_MESSAGE');

const addMessage = (state, action) => {
  return [...state, action.payload];
};

const reducer = handleActions(
  {
    [combineActions(actions.addMessage, actions.incMessage)]: addMessage,
  },
  defaultState
);

export default {
  reducer,
  actions
};
