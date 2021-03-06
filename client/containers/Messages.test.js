/* global shallow describe it expect */
/* eslint-disable import/first */
import React from 'react';

import createStore from '../store'; // TODO: fix relative

import {
  MessagesRender,
  mapStateToProps,
  mapDispatchToProps
} from './Messages';

const store = createStore();

describe('(Container) Messages', () => {
  const state = store.getState();
  const initialProps = mapStateToProps(state);
  const initialActions = mapDispatchToProps(x => x);
  const props = {
    ...initialActions,
    ...initialProps
  };

  it('will receive right props', () => {
    expect(initialProps).toMatchSnapshot();
  });

  it('will receive right actions', () => {
    expect(initialActions).toMatchSnapshot();
  });

  it('should render', () => {
    const wrapper = shallow(<MessagesRender {...props} />, {
      context: { store }
    });
    expect(wrapper).toMatchSnapshot();
  });
});
