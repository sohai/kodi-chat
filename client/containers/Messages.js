import React from 'react';
import { compose, pure } from 'recompact';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MessagesList from '../components/MessagesList';
import messagesSelectores from '../store/selectors/messages';

const propTypes = PropTypes && {};

export const MessagesRender = ({ messages }) => (
  <MessagesList items={messages} />
);

export const mapStateToProps = state => ({
  messages: messagesSelectores.items(state)
});

export const mapDispatchToProps = dispatch =>
  bindActionCreators({
    // put action creator here:
    // removeFoo: fooHandlers.actions.remove
    dispatch
  });

MessagesRender.propTypes = propTypes;
MessagesRender.displayName = 'Messages';
export default compose(connect(mapStateToProps, mapDispatchToProps), pure)(
  MessagesRender
);
