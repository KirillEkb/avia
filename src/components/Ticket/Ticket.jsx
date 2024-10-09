import classes from './Ticket.module.scss';

const Ticket = () => {
  return (
    <div className={classes.ticket}>
      <div className={classes.price}>13 400 Р</div>
      <div className={classes.logo}></div>
      <div className={classes.route}>
        <div className={classes.title}>MOW – HKT</div>
        <div className={classes.schedule}>10:45 – 08:00</div>
      </div>
      <div className={classes.length}>
        <div className={classes.title}>В ПУТИ</div>
        <div className={classes.totalTime}>21ч 15м</div>
      </div>
      <div className={classes.stops}>
        <div className={classes.title}>2 ПЕРЕСАДКИ</div>
        <div className={classes.transfers}>HKG, JNB</div>
      </div>
    </div>
  );
};

export default Ticket;
