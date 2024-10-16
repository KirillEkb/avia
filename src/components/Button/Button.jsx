import classNames from 'classnames';

import classes from './Button.module.scss';

const Button = ({ text = '', classNameProps = '', onClick }) => {
  return (
    <button onClick={onClick} className={classNames(classes.button, classes[classNameProps])}>
      {text}
    </button>
  );
};

export default Button;
