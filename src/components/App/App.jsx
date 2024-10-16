import Filters from '../Filters/Filters.jsx';
import TicketList from '../TicketList/TicketList.jsx';

import classes from './App.module.scss';

const App = () => {
  return (
    <>
      <img className={classes.logo} src="./images/AviasalesLogo.svg" alt="logo" />
      <div className={classes.app}>
        <Filters className={classes.filters}></Filters>
        <TicketList></TicketList>
      </div>
    </>
  );
};

export default App;
