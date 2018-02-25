import React from 'react';
import PropTypes from 'prop-types';
import styles from './Overlay.css';

const propTypes = PropTypes && {
  children: PropTypes.node
};
export const Overlay = ({ children }) => (
  <div className={styles.root}>{children}</div>
);

Overlay.displayName = 'Overlay';
Overlay.propTypes = propTypes;
export default Overlay;
