import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware';

export const pending = actionCreator => `${actionCreator}_${PENDING}`;
export const fulfilled = actionCreator => `${actionCreator}_${FULFILLED}`;
export const rejected = actionCreator => `${actionCreator}_${REJECTED}`;
