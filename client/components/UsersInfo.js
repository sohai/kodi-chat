import React from 'react';
import { pure, compose } from 'recompact';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = PropTypes && {};
const defaultProps = {};

export const UsersInfoComponent = ({ you, contact }) => (
  <div className={classNames('asd')}>
    You({you.name}) are talking with {contact.name || 'noone'}
  </div>
);

UsersInfoComponent.displayName = 'UsersInfo';
UsersInfoComponent.propTypes = propTypes;
UsersInfoComponent.defaultProps = defaultProps;
export default compose(pure)(UsersInfoComponent);
