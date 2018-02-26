/* global shallow describe it expect */
/* eslint-disable import/first */
import React from 'react';

import createStore from '../store';

import { AppRender, mapStateToProps } from './App';

const store = createStore();

describe('(Container) App', () => {
  const state = store.getState();
  const initialProps = mapStateToProps(state);
  const props = {
    ...initialProps
  };

  it('will receive right props', () => {
    expect(initialProps).toMatchSnapshot();
  });

  it('should render', () => {
    const wrapper = shallow(<AppRender {...props} />, { context: { store } });
    expect(wrapper).toMatchSnapshot();
  });
});
