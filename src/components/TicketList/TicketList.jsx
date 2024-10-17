import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Progress, Alert } from 'antd';
import { Offline, Online } from 'react-detect-offline';

import Tabs from '../Tabs/Tabs';
import Ticket from '../Ticket/Ticket';
import Button from '../Button/Button';

import { fetchSearchId, fetchTickets } from './../../api/api';
import classes from './TicketList.module.scss';

const TicketList = () => {
  const dispatch = useDispatch();
  const fromState = (selector) => useSelector((state) => state.app[selector]);
  const searchId = fromState('searchId');
  const loading = fromState('loading');
  const error = fromState('error');
  const tickets = fromState('tickets');
  const stop = fromState('stop');
  const filter = fromState('filter');
  const tabs = fromState('tabs');

  const percent = Math.floor(tickets.length / 100);
  const [searchCounter, setSearchCounter] = useState(5);
  const memoFilter = useMemo(() => filter, [filter]);
  const memoTabs = useMemo(() => tabs, [tabs]);

  useEffect(() => {
    dispatch(fetchSearchId());
  }, []);
  useEffect(() => {
    dispatch(fetchTickets([searchId, stop]));
  }, [searchId, tickets]);

  useEffect(() => {
    setSearchCounter(5);
  }, [memoTabs, memoFilter]);

  const filteredTickets = (tickets) => {
    const filteredWithFilter = tickets.filter((ticket) => {
      const stopLength = ticket.segments[0].stops.length;
      const revStopLength = ticket.segments[1].stops.length;
      if (memoFilter.includes('Все')) {
        return true;
      } else if (memoFilter.includes('Без пересадок') && (stopLength === 0 || revStopLength === 0)) {
        return true;
      } else if (memoFilter.includes('1 пересадка') && (stopLength === 1 || revStopLength === 1)) {
        return true;
      } else if (memoFilter.includes('2 пересадки') && (stopLength === 2 || revStopLength === 2)) {
        return true;
      } else if (memoFilter.includes('3 пересадки') && (stopLength === 3 || revStopLength === 3)) {
        return true;
      }
      return false;
    });
    const copyFilteredWithFilter = [...filteredWithFilter];
    if (memoTabs === 'САМЫЙ ДЕШЕВЫЙ') {
      copyFilteredWithFilter.sort((a, b) => a.price - b.price);
    } else if (memoTabs === 'САМЫЙ БЫСТРЫЙ') {
      copyFilteredWithFilter.sort(
        (a, b) => a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration)
      );
    } else {
      copyFilteredWithFilter;
    }
    return copyFilteredWithFilter;
  };

  const showMore = () => {
    setSearchCounter((searchCounter) => searchCounter + 5);
  };

  return (
    <div className={classes.ticketList}>
      {error && !loading && (
        <Offline>
          <Alert type="error" message="Проверьте подключение к сети"></Alert>
        </Offline>
      )}
      {error && (
        <Online>
          <Alert type="error" message="Что-то пошло не так"></Alert>
        </Online>
      )}
      {loading && <Progress percent={percent} status="active" />}
      <Tabs />
      <>
        {filteredTickets(tickets).length === 0 && <p>Рейсов, подходящих под заданные фильтры, не найдено</p>}
        {filteredTickets(tickets)
          .slice(0, searchCounter)
          .map((ticket) => (
            <Ticket
              key={`${ticket.price}${ticket.carrier}${ticket.segments[0].date}`}
              carrier={ticket.carrier}
              price={ticket.price}
              date={[ticket.segments[0].date, ticket.segments[1].date]}
              destination={[ticket.segments[0].destination, ticket.segments[1].destination]}
              duration={[ticket.segments[0].duration, ticket.segments[1].duration]}
              origin={[ticket.segments[0].origin, ticket.segments[1].origin]}
              stops={[ticket.segments[0].stops, ticket.segments[1].stops]}
              time={[ticket.segments[0].time, ticket.segments[1].time]}
              stop={[stop]}
            ></Ticket>
          ))}
      </>
      <Button text="ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!" classNameProps="active" onClick={showMore}></Button>
    </div>
  );
};

export default TicketList;
