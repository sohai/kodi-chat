import { createActions, handleActions } from 'redux-actions';
import proxy from '../providers/ws';

const defaultState = {
  you: {
    available: false,
    name: ''
  },
  contact: {
    available: false,
    name: '',
    typing: false
  }
};

const actions = createActions(
  'INIT',
  'JOIN',
  'YOUR_NAME',
  'CONTACT_NAME',
  'TYPING'
);

const setName = name => async dispatch => {
  dispatch(actions.yourName(name));
  proxy.emit('set name', name);
};

const sendTyping = isTyping => () => {
  proxy.emit('typing', isTyping);
};

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

const yourName = (state, action) => ({
  ...state,
  you: {
    ...state.you,
    name: action.payload
  }
});

const contactName = (state, action) => ({
  ...state,
  contact: {
    ...state.contact,
    name: action.payload
  }
});

const typing = (state, action) => ({
  ...state,
  contact: {
    ...state.contact,
    typing: action.payload
  }
});

const reducer = handleActions(
  {
    [actions.init]: toInitState,
    [actions.join]: join,
    [actions.yourName]: yourName,
    [actions.contactName]: contactName,
    [actions.typing]: typing
  },
  defaultState
);

export default {
  reducer,
  actions: {
    ...actions,
    setName,
    sendTyping
  }
};
