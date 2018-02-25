/* global shallow, describe, it, expect */
/* eslint-disable import/first */
import React from 'react';
import TextInput from './TextInput';

describe('(Component) TextInput', () => {
  it('should render', () => {
    const props = {
      children: <span>test</span>
    };
    const wrapper = shallow(<TextInput {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
