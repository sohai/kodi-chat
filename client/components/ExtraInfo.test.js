/* global render, describe, it, expect */
/* eslint-disable import/first */
import React from 'react';
import ExtraInfo from './ExtraInfo';

describe('(Component) ExtraInfo', () => {
  it('should render', () => {
    const props = {
      info: 'Info text'
    };
    const wrapper = render(<ExtraInfo {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
