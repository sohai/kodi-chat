import React from 'react';
import { pure, compose } from 'recompact';
import PropTypes from 'prop-types';
// import ImmutablePropTypes from 'react-immutable-proptypes'
import classNames from 'classnames';
import styles from './Message.css';
import Typography from './Typography';

const propTypes = PropTypes && {};
const defaultProps = {
};

export const MessageComponent = ({ item, className: classNameProp }) => {
  const className = classNames(
    styles.message,
    {
      [styles.incoming]: item.type === 'inc',
      [styles.thinking]: item.variant === 'thinking'
    },
    classNameProp
  );
  return <div className={className}>
    <Typography variant="body">{item.message}</Typography>
    <Typography fade variant="caption" align="right">{item.username}</Typography>
  </div>;
};

MessageComponent.displayName = 'Message';
MessageComponent.propTypes = propTypes;
MessageComponent.defaultProps = defaultProps;
export default compose(pure)(MessageComponent);
