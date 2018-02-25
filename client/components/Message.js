import React from 'react';
import { pure, compose } from 'recompact';
import PropTypes from 'prop-types';
// import ImmutablePropTypes from 'react-immutable-proptypes'
import classNames from 'classnames';

const propTypes = PropTypes && {};
const defaultProps = {};


export const MessageComponent = ({ item }) => (
  <div className="message">{item.message}</div>
);

MessageComponent.displayName = 'Message';
MessageComponent.propTypes = propTypes;
MessageComponent.defaultProps = defaultProps;
export default compose(pure)(MessageComponent);
