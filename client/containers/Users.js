import React from 'react';
import { compose, pure } from 'recompact';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import usersSelector from '../store/selectors/users';
import UsersInfo from '../components/UsersInfo';

const propTypes = PropTypes && {};

export const UsersRender = ({ you, contact }) => (
  <UsersInfo you={you} contact={contact} />
);

export const mapStateToProps = state => ({
  you: usersSelector.you(state),
  contact: usersSelector.contact(state)
});

UsersRender.propTypes = propTypes;
UsersRender.displayName = 'Users';
export default compose(connect(mapStateToProps), pure)(UsersRender);
