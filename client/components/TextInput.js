import React from 'react';
import PropTypes from 'prop-types';
import styles from './TextInput.css';

const propTypes =
  PropTypes &&
  {
    //classes: PropTypes.object.isRequired
  };
const defaultProps = {};

export const TextInputComponent = ({ value, onChange, onEnter }) => (
  <div className={styles.root}>
    <input className={styles.input} value={value} onChange={onChange} onKeyPress={onEnter} />
  </div>
);

TextInputComponent.displayName = 'TextInput';
TextInputComponent.propTypes = propTypes;
TextInputComponent.defaultProps = defaultProps;
export default TextInputComponent;
