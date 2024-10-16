import { connect, useSelector } from 'react-redux';

import Button from '../Button/Button';
import { changeTabs } from '../../store/reducer';

import classes from './Tabs.module.scss';
const Tabs = ({ changeTabs }) => {
  const buttonsDescription = ['САМЫЙ ДЕШЕВЫЙ', 'САМЫЙ БЫСТРЫЙ', 'ОПТИМАЛЬНЫЙ'];
  const tabs = useSelector((state) => state.app.tabs);
  const classNames = (item) => {
    if (tabs === item) {
      return 'active';
    }
  };
  const buttons = buttonsDescription.map((item) => (
    <Button key={item} classNameProps={classNames(item)} onClick={() => changeTabs(item)} text={item}></Button>
  ));
  return <div className={classes.tabs}>{buttons}</div>;
};
const mapsDispatchToProps = (dispatch) => {
  return {
    changeTabs: (item) => {
      dispatch(changeTabs(item));
    },
  };
};
export default connect(null, mapsDispatchToProps)(Tabs);
