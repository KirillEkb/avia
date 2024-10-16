import { connect } from 'react-redux';

import { changeFilter } from '../../store/reducer';

import classes from './Filters.module.scss';

const Filter = ({ filter, changeFilter }) => {
  const filterList = ['Все', 'Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки'].map((item) => {
    return (
      <li key={item} className={classes.filter}>
        <label className={classes.filter__label}>
          <input
            className={classes.standardCheckBox}
            type="checkbox"
            checked={filter.includes(item)}
            onChange={() => {
              changeFilter(item);
            }}
          />
          <span className={classes.checkbox} /> {item}
        </label>
      </li>
    );
  });
  return (
    <div className={classes.filters}>
      <h3 className={classes.title}>КОЛИЧЕСТВО ПЕРЕСАДОК</h3>
      <ul className={classes.list}>{filterList}</ul>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    filter: state.app.filter,
  };
};
export default connect(mapStateToProps, { changeFilter })(Filter);
