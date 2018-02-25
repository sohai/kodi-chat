import React from 'react';
import PropTypes from 'prop-types';
import styles from './TextInput.css';

const propTypes =
  PropTypes &&
  {
    //classes: PropTypes.object.isRequired
  };
const defaultProps = {};

export const TextInput = ({ value, onChange, onKeyPress }) => (
  <div className={styles.root}>
    <input className={styles.input} value={value} onChange={onChange} onKeyPress={onKeyPress} />
  </div>
);

TextInput.displayName = 'TextInput';
TextInput.propTypes = propTypes;
TextInput.defaultProps = defaultProps;
export default TextInput;
