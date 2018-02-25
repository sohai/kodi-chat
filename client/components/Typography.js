import React from 'react';
import PropTypes from 'prop-types';
import styles from './Typography.css';
import classNames from 'classnames';

const propTypes = PropTypes && {
  color: PropTypes.oneOf(['light', 'dark']),
  variant: PropTypes.oneOf(['display1', 'body', 'caption']),
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  children: PropTypes.node,
  fade: PropTypes.bool,
  align: PropTypes.oneOf(['left', 'right'])
};

const defaultProps = {
  color: 'dark',
  variant: 'body',
  component: 'div',
  fade: false,
  align: 'left'
};

const Typography = ({
  className: classNameProp,
  color,
  variant,
  component: Component,
  fade,
  align,
  ...rest
}) => {
  const className = classNames(
    styles.root,
    {
      [styles.light]: color === 'light',
      [styles.dark]: color === 'dark',
      [styles.display1]: variant === 'display1',
      [styles.caption]: variant === 'caption',
      [styles.fade]: fade,
      [styles.alignRight]: align === 'right'
    },
    classNameProp
  );

  return <Component className={className} {...rest} />;
};
Typography.displayName = 'Typography';
Typography.propTypes = propTypes;
Typography.defaultProps = defaultProps;
export default Typography;
