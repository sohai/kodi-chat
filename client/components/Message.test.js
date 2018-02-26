/* global render, describe, it, expect */
/* eslint-disable import/first */
import React from 'react';
import Message from './Message';

describe('(Component) Message', () => {
  it('should render', () => {
    const props = {
      item: {
        type: 'inc',
        message: 'message',
        thinking: 'thinking'
      }
    };
    const wrapper = render(<Message {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
