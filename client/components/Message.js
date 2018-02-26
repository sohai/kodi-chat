import React from 'react';
import { pure, compose } from 'recompact';
import PropTypes from 'prop-types';
// import ImmutablePropTypes from 'react-immutable-proptypes'
import classNames from 'classnames';
import styles from './Message.css';
import Typography from './Typography';

const propTypes = PropTypes && {};
const defaultProps = {};

export const MessageComponent = ({ item, className: classNameProp }) => {
  const className = classNames(
    styles.message,
    {
      [styles.incoming]: item.type === 'inc',
      [styles.thinking]: item.variant === 'thinking'
    },
    classNameProp
  );
  const textParts = item.message.split(':)');
  return (
    <div className={className}>
      <Typography variant="body">
        {textParts.map((text, idx) => {
          return (
            <span key={idx}>
              {text}
              {idx !== textParts.length - 1 && (
                <img
                  className={styles.emo}
                  src="https://emojipedia-us.s3.amazonaws.com/thumbs/160/twitter/53/slightly-smiling-face_1f642.png"
                />
              )}
            </span>
          );
        })}
      </Typography>
      <Typography fade variant="caption" align="right">
        {item.username}
      </Typography>
    </div>
  );
};

MessageComponent.displayName = 'Message';
MessageComponent.propTypes = propTypes;
MessageComponent.defaultProps = defaultProps;
export default compose(pure)(MessageComponent);
