import React from 'react';
import { compose, pure, withState, withHandlers } from 'recompact';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextInput } from '../components/TextInput';
import proxy from '../providers/ws';
import messagesHandler from '../handlers/messages';

const propTypes = PropTypes && {};

export const TextInputRender = ({ value, onChange, onKeyPress }) => (
  <TextInput value={value} onChange={onChange} onKeyPress={onKeyPress} />
);

export const mapStateToProps = state => ({
  username: state.users.you.name
});

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addMessage: messagesHandler.actions.addMessage
    },
    dispatch
  );

TextInputRender.propTypes = propTypes;
TextInputRender.displayName = 'TextInput';
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('value', 'updateValue', ''),
  withHandlers({
    onChange: props => event => {
      props.updateValue(event.target.value);
    },
    onKeyPress: props => event => {
      if (event.key === 'Enter') {
        const { value, username, updateValue } = props;
        props.addMessage({
          username,
          message: value
        });
        proxy.emit('new message', value);
        updateValue('');
      }
    }
  }),
  pure
)(TextInputRender);
