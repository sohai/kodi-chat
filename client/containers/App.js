import React from 'react';
import { compose, pure, branch, renderComponent } from 'recompact';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Overlay from '../components/Overlay';
import Typography from '../components/Typography';

const propTypes = PropTypes && {};

const fullPageInfo = info => () => (
  <Overlay>
    <Typography variant="display1" color="light">
      {info}
    </Typography>
  </Overlay>
);

const LoadingOverlay = fullPageInfo('Loading...');

export const AppRender = ({ children, error }) => error!==null ? React.createElement(fullPageInfo(error)) : children;

export const mapStateToProps = state => ({
  pending: state.connection.pending,
  error: state.connection.error
});

AppRender.propTypes = propTypes;
AppRender.displayName = 'App';
export default compose(
  connect(mapStateToProps),
  branch(({ pending }) => pending, renderComponent(LoadingOverlay)),
  pure
)(AppRender);
