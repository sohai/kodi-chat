/* global shallow, render, describe, it, expect */
/* eslint-disable import/first */
import React from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import theme from '../../theme/theme';
import MessagesList from './MessagesList';

describe('(Component) MessagesList', () => {
  it('should render', () => {
    const props = {
      children: <span>test</span>
    };
    const wrapper = render(
      <MuiThemeProvider theme={theme}>
        <MessagesList {...props} />
      </MuiThemeProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
