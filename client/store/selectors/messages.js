import keysNames from '../keysNames';
import { createSelector } from 'reselect';
import users from './users';
const store = s => s[keysNames.messages];

const items = createSelector(store, users.you, (items, you) =>
  items.map(item => {
    return {
      ...item,
      type: item.username === you.name ? 'out' : 'inc'
    };
  })
);

export default {
  store,
  items
};
