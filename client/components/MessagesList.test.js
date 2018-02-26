/* global render, describe, it, expect */
/* eslint-disable import/first */
import React from 'react';
import MessagesList from './MessagesList';

describe('(Component) MessagesList', () => {
  it('should render', () => {
    const props = {
      items: []
    };
    const wrapper = render(<MessagesList {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
