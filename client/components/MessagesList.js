import React from 'react';
import { pure, compose } from 'recompact';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Message from './Message';

const propTypes = PropTypes && {};
const defaultProps = {};

export const MessagesListComponent = ({ items }) => (
  <div className="content">
    {items.map((item, idx) => <Message key={idx} item={item} />)}
  </div>
);

MessagesListComponent.displayName = 'MessagesList';
MessagesListComponent.propTypes = propTypes;
MessagesListComponent.defaultProps = defaultProps;
export default compose(pure)(MessagesListComponent);
