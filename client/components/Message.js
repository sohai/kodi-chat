import React from 'react';
import { pure, compose } from 'recompact';
import PropTypes from 'prop-types';
// import ImmutablePropTypes from 'react-immutable-proptypes'
import classNames from 'classnames';
import styles from './Message.css';

const propTypes = PropTypes && {};
const defaultProps = {};

export const MessageComponent = ({ item, className: classNameProp }) => {
  const className = classNames(
    styles.message,
    {
      [styles.incoming]: item.type === 'inc'
    },
    classNameProp
  );
  return <div className={className}>{item.message}</div>;
};

MessageComponent.displayName = 'Message';
MessageComponent.propTypes = propTypes;
MessageComponent.defaultProps = defaultProps;
export default compose(pure)(MessageComponent);
