import React from 'react';
import {
  pure,
  compose,
  setDisplayName,
  setPropTypes,
  defaultProps
} from 'recompact';
import PropTypes from 'prop-types';
import Typography from './Typography';
import styles from './ExtraInfo.css';

export const ExtraInfoComponent = ({ info }) => (
  <Typography align="right" variant="caption" className={styles.root}>
    {info}
  </Typography>
);
export default compose(
  setDisplayName('ExtraInfoComponent'),
  setPropTypes({
    info: PropTypes.string
  }),
  defaultProps({
    info: ''
  }),
  pure
)(ExtraInfoComponent);
