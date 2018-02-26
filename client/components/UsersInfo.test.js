/* global render, describe, it, expect */
/* eslint-disable import/first */
import React from 'react';
import UsersInfo from './UsersInfo';

describe('(Component) UsersInfo', () => {
  it('should render', () => {
    const props = {
      you: {
        name: 'you'
      },
      contact: {
        name: 'name'
      }
    };
    const wrapper = render(<UsersInfo {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
