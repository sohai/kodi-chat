import React from 'react';
import { pure, compose } from 'recompact';
import PropTypes from 'prop-types';

const propTypes = PropTypes && {};
const defaultProps = {};

export const UsersInfoComponent = ({ you, contact }) => (
  <div>
    You({you.name}) are talking with {contact.name || 'noone'}
  </div>
);

UsersInfoComponent.displayName = 'UsersInfo';
UsersInfoComponent.propTypes = propTypes;
UsersInfoComponent.defaultProps = defaultProps;
export default compose(pure)(UsersInfoComponent);
