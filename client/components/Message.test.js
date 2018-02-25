/* global shallow, render, describe, it, expect */
/* eslint-disable import/first */
import React from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import theme from '../../theme/theme';
import Message from './Message';

describe('(Component) Message', () => {
  it('should render', () => {
    const props = {
      children: <span>test</span>
    };
    const wrapper = render(
      <MuiThemeProvider theme={theme}>
        <Message {...props} />
      </MuiThemeProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
