import reduce from 'lodash/reduce';
import set from 'lodash/set';
import { createSelector } from 'reselect';

export default (store, keys) =>
  reduce(
    keys,
    (acc, k) => set(acc, k, createSelector(store, s => s.get(k))),
    {}
  );
