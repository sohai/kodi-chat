/* global shallow, describe, it, expect */
/* eslint-disable import/first */
import React from 'react';
import Typography from './Typography';

describe('(Component) TextInput', () => {
  it('should render with default props', () => {
    const props = {
      children: 'Typography default'
    };
    const wrapper = shallow(<Typography {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render with given color variant and component', () => {
    const props = {
      children: 'Typography with props',
      color: 'light',
      variant: 'display1',
      component: 'span'
    };
    const wrapper = shallow(<Typography {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
