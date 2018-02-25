import { createActions, handleActions } from 'redux-actions';

const defaultState = {
  you: {
    available: false,
    name: ''
  },
  contact: {
    available: false,
    name: ''
  }
};

const actions = createActions('INIT', 'JOIN');

const toInitState = (state, action) => {
  const splitted = action.payload.split(',');
  const contactAvaiable = splitted.length > 1;
  return {
    ...state,
    you: {
      available: true,
      name: splitted[0]
    },
    contact: {
      available: contactAvaiable,
      name: contactAvaiable ? splitted[1] : ''
    }
  };
};

const join = (state, action) => ({
  ...state,
  contact: {
    available: true,
    name: action.payload
  }
});

const reducer = handleActions(
  {
    [actions.init]: toInitState,
    [actions.join]: join
  },
  defaultState
);

export default {
  reducer,
  actions
};
