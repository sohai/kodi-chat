import React from 'react';
import { compose, pure, withState, withHandlers } from 'recompact';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextInput } from '../components/TextInput';
import messagesHandler from '../handlers/messages';
import usersHandler from '../handlers/users';

const propTypes = PropTypes && {};

export const TextInputRender = ({ value, onChange, onKeyPress, typing }) => (
  <React.Fragment>
    <div>{typing ? 'istyping' : ''}</div>
    <TextInput value={value} onChange={onChange} onKeyPress={onKeyPress} />
  </React.Fragment>
)

export const mapStateToProps = state => ({
  username: state.users.you.name,
  typing: state.users.contact.typing
});

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setName: usersHandler.actions.setName,
      setTyping: usersHandler.actions.sendTyping,
      addMessage: messagesHandler.actions.addMessage,
      removeMyLastMessage: messagesHandler.actions.removeMyLastMessage,
      addAndSendMessage: messagesHandler.actions.addAndSendMessage
    },
    dispatch
  );

TextInputRender.propTypes = propTypes;
TextInputRender.displayName = 'TextInputContainer';

const isCommand = msg => msg.charAt(0) === '/';
const COMMAND_LIST = ['/nick', '/think', '/oops'];
const cmdToActionPropName = {
  '/nick': 'setName',
  '/oops': 'removeMyLastMessage',
  '/think': 'addAndSendMessage'
};
let typingTimeout = null;
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('value', 'updateValue', ''),
  withHandlers({
    onChange: props => event => {
      props.updateValue(event.target.value);
    },
    onKeyPress: props => event => {
      const { updateValue } = props;
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      } else {
        props.setTyping(true);
      }
      typingTimeout = setTimeout(() => {
        props.setTyping(false);
        typingTimeout = null;
      }, 1000);
      if (event.key === 'Enter') {
        const { value, username } = props;
        if (isCommand(props.value)) {
          let [cmd, ...rest] = props.value.split(' ');
          if (!COMMAND_LIST.includes(cmd)) {
            console.warn('invalid command');
          } else {
            if (cmd === '/oops') rest = [props.username];
            if (cmd === '/think') rest = [rest[0], props.username, 'thinking'];
            console.log(rest);
            props[cmdToActionPropName[cmd]](...rest);
          }
        } else if (value) {
          props.addAndSendMessage(value, username);
        }
        updateValue('');
      }
    }
  }),
  pure
)(TextInputRender);
