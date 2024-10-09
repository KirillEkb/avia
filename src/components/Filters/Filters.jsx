import classes from './Filters.module.scss';

const Filter = () => {
  return (
    <div className={classes.filters}>
      <h3 className={classes.title}>КОЛИЧЕСТВО ПЕРЕСАДОК</h3>
      <ul className={classes.list}>
        <li className={classes.filter}>
          <label className={classes.filter__label}>
            <input className={classes.standardCheckBox} type="checkbox" />
            <span className={classes.checkbox} /> Все
          </label>
        </li>
        <li className={classes.filter}>
          <label className={classes.filter__label}>
            <input className={classes.standardCheckBox} type="checkbox" />
            <span className={classes.checkbox} /> Без пересадок
          </label>
        </li>
        <li className={classes.filter}>
          <label className={classes.filter__label}>
            <input className={classes.standardCheckBox} type="checkbox" />
            <span className={classes.checkbox} /> 1 пересадка
          </label>
        </li>
        <li className={classes.filter}>
          <label className={classes.filter__label}>
            <input className={classes.standardCheckBox} type="checkbox" />
            <span className={classes.checkbox} /> 2 пересадки
          </label>
        </li>
        <li className={classes.filter}>
          <label className={classes.filter__label}>
            <input className={classes.standardCheckBox} type="checkbox" />
            <span className={classes.checkbox} /> 3 пересадки
          </label>
        </li>
      </ul>
    </div>
  );
};

export default Filter;
