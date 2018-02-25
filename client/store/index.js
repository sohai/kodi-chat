import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import reducers from './reducers';

const reduxStore = (initialState = {}) => {
  let middlewares = applyMiddleware(thunk, promiseMiddleware());
  if (window.devToolsExtension) {
    middlewares = compose(
      middlewares,
      window.devToolsExtension && window.devToolsExtension()
    );
  }
  const store = createStore(reducers, initialState, middlewares);
  return store;
};

export default reduxStore;
