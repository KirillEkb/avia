import { parseISO, addMinutes, format } from 'date-fns';

import classes from './Ticket.module.scss';

const Ticket = ({ carrier, price, origin, destination, stops, date, duration }) => {
  const endDate1 = addMinutes(parseISO(date[0]), duration[0]);
  const endDate2 = addMinutes(parseISO(date[1]), duration[1]);
  const imgSrc = `https://pics.avs.io/110/36/${carrier}.svg`;
  const transferCounter = (stops) => {
    if (stops.length === 0) {
      return 'БЕЗ ПЕРЕСАДОК';
    }
    if (stops.length === 1) {
      return '1 ПЕРЕСАДКА';
    }
    return `${stops.length} ПЕРЕСАДКИ`;
  };
  return (
    <div className={classes.ticket}>
      <div className={classes.price}>{price} P</div>
      <img src={imgSrc} className={classes.logo} alt={carrier}></img>
      <div className={classes.route}>
        <div className={classes.title}>
          {origin[0]} – {destination[0]}
        </div>
        <div className={classes.schedule}>{`${format(date[0], 'HH:mm')} – ${format(endDate1, 'HH:mm')}`}</div>
      </div>
      <div className={classes.revRoute}>
        <div className={classes.title}>
          {origin[1]} – {destination[1]}
        </div>
        <div className={classes.schedule}>{`${format(date[1], 'HH:mm')} – ${format(endDate2, 'HH:mm')}`}</div>
      </div>
      <div className={classes.length}>
        <div className={classes.title}>В ПУТИ</div>
        <div className={classes.totalTime}>{`${Math.floor(duration[0] / 60)}ч ${duration[0] % 60}м`}</div>
      </div>
      <div className={classes.revLength}>
        <div className={classes.title}>В ПУТИ</div>
        <div className={classes.totalTime}>{`${Math.floor(duration[1] / 60)}ч ${duration[1] % 60}м`}</div>
      </div>
      <div className={classes.stops}>
        <div className={classes.title}>{transferCounter(stops[0])}</div>
        <div className={classes.transfers}>{stops[0].join(', ')}</div>
      </div>
      <div className={classes.revStops}>
        <div className={classes.title}>{transferCounter(stops[1])}</div>
        <div className={classes.transfers}>{stops[1].join(', ')}</div>
      </div>
    </div>
  );
};

export default Ticket;
