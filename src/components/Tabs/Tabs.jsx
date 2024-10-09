import Button from '../Button/Button';

import classes from './Tabs.module.scss';
const Tabs = () => {
  const buttonsDescription = ['Самый дешевый', 'Самый быстрый', 'Оптимальный'];
  const buttons = buttonsDescription.map((item) => <Button key={item} text={item.toUpperCase()}></Button>);
  return <div className={classes.tabs}>{buttons}</div>;
};

export default Tabs;
