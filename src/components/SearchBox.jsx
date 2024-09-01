import { useId } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectNameFilter, changeFilter } from '../redux/filtersSlice';

import classes from './SearchBox.module.css';

function SearchBox() {
  const searchId = useId();
  const value = useSelector(selectNameFilter);
  const dispatch = useDispatch();

  const handleFilterChange = newFilterValue => {
    dispatch(changeFilter(newFilterValue));
  };

  return (
    <div className={classes['search-box-container']}>
      <label htmlFor={searchId}>Find contacts by name</label>
      <input
        id={searchId}
        value={value}
        type="search"
        className={classes['search-box']}
        onChange={event => handleFilterChange(event.target.value)}
      />
    </div>
  );
}

export default SearchBox;
