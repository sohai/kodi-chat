import React from 'react';
import PropTypes from 'prop-types';
import styles from './Typography.css';
import classNames from 'classnames';

const propTypes = PropTypes && {
  color: PropTypes.oneOf(['light', 'dark']),
  variant: PropTypes.oneOf(['display1', 'body']),
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  children: PropTypes.node
};

const defaultProps = {
  color: 'dark',
  variant: 'body',
  component: 'div'
};

const Typography = ({
  className: classNameProp,
  color,
  variant,
  component: Component,
  ...rest
}) => {
  const className = classNames(
    styles.root,
    {
      [styles.light]: color === 'light',
      [styles.dark]: color === 'dark',
      [styles.display1]: variant === 'display1'
    },
    classNameProp
  );

  return <Component className={className} {...rest} />;
};
Typography.displayName = 'Typography';
Typography.propTypes = propTypes;
Typography.defaultProps = defaultProps;
export default Typography;
