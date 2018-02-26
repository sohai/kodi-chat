import React from 'react';
import { compose, pure, mapProps } from 'recompact';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import ExtraInfo from '../components/ExtraInfo';

const propTypes = PropTypes && {};

export const ExtraInfoRender = ({ info }) => <ExtraInfo info={info} />;

export const mapStateToProps = state => ({
  contact: state.users.contact.name,
  typing: state.users.contact.typing
});

ExtraInfoRender.propTypes = propTypes;
ExtraInfoRender.displayName = 'ExtraInfo';
export default compose(
  connect(mapStateToProps),
  mapProps(({ typing, contact }) => {
    return {
      info: typing ? `${contact} is typing` : ''
    };
  }),
  pure
)(ExtraInfoRender);
