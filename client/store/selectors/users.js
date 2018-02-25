import keysNames from '../keysNames';
import { createSelector } from 'reselect';

const store = s => s[keysNames.users];

const you = createSelector(store, store => store.you);

const contact = createSelector(store, store => store.contact);

export default {
  store,
  you,
  contact
};
