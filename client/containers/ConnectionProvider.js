import { compose, pure, lifecycle } from 'recompact';
import { PropTypes } from 'prop-types';
import connectionHandler from '../handlers/connection';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import config from '../../config';
const propTypes = PropTypes && {};

export const ConnectionProviderRender = ({ children }) => children;

export const mapStateToProps = state => ({
  available: state.connection.available,
  pending: state.connection.pending,
  error: state.connection.error
});
export const lifecycleHooks = lifecycle({
  componentDidMount() {
    this.props.startAndSubscribe(`http://${config.host}:${config.port}`);
  },
  componentWillUnmount() {
    this.props.stop();
  }
});

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...connectionHandler.actions
    },
    dispatch
  );

ConnectionProviderRender.propTypes = propTypes;
ConnectionProviderRender.displayName = 'ConnectionProvider';
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycleHooks,
  pure
)(ConnectionProviderRender);
