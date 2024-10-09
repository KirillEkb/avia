import Tabs from '../Tabs/Tabs';
import Ticket from '../Ticket/Ticket';
import Button from '../Button/Button';

import classes from './TicketList.module.scss';

const TicketList = () => {
  return (
    <div className={classes.ticketList}>
      <Tabs />
      <Ticket />
      <Ticket />
      <Ticket />
      <Button text="ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!" cl="active"></Button>
    </div>
  );
};

export default TicketList;
