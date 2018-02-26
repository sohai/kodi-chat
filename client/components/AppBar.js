import React from 'react';
import { pure, compose, setDisplayName } from 'recompact';
import styles from './AppBar.css';
import UsersInfo from '../containers/Users';
import Typography from './Typography';

export const ExtraInfoComponent = () => (
  <header className={styles.root}>
    <Typography color="light" variant="display1">
      Kodify Chat
    </Typography>
    <UsersInfo />
  </header>
);
export default compose(setDisplayName('AppBarComponent'), pure)(
  ExtraInfoComponent
);
