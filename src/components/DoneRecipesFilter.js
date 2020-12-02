import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import '../css/CategoryFilters.css';

function DoneRecipesFilter() {
  const { setDoneFilter } = useContext(RecipesContext);

  const onClick = ({ target }) => {
    const { value } = target;

    setDoneFilter(value);
  };

  return (
    <div>
      <button
        data-testid="filter-by-all-btn"
        onClick={ onClick }
        type="button"
        value="all"
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        onClick={ onClick }
        type="button"
        value="comida"
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ onClick }
        type="button"
        value="bebida"
      >
        Drinks
      </button>
    </div>
  );
}

export default DoneRecipesFilter;
