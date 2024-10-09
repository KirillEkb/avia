import classNames from 'classnames';

import classes from './Button.module.scss';

const Button = ({ text = '', cl = '' }) => {
  return <button className={classNames(classes.button, classes[cl])}>{text}</button>;
};

export default Button;
