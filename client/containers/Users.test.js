/* global shallow describe it expect */
/* eslint-disable import/first */
import React from 'react';

import createStore from '../store';

import { UsersRender, mapStateToProps } from './Users';

const store = createStore();

describe('(Container) Users', () => {
  const state = store.getState();
  const initialProps = mapStateToProps(state);
  const props = {
    ...initialProps
  };

  it('will receive right props', () => {
    expect(initialProps).toMatchSnapshot();
  });

  it('should render', () => {
    const wrapper = shallow(<UsersRender {...props} />, { context: { store } });
    expect(wrapper).toMatchSnapshot();
  });
});
