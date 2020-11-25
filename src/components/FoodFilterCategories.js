import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

function FoodFilterCategories({ categories }) {
  const {
    filteredCategories,
    getFoodCategories,
    getFoodAPI,
    setActiveFilter,
    activeFilter,
  } = useContext(RecipesContext);

  useEffect(() => {
    getFoodCategories();
  }, []);

  const onClick = (value) => {
    if (value === 'All' || activeFilter === value) {
      getFoodAPI('name-filter', '');
      setActiveFilter('All');
    } else {
      getFoodAPI('category-filter', value);
      setActiveFilter(value);
    }
  };

  return categories !== null && (
    <div>
      <button
        data-testid="All-category-filter"
        type="button"
        value="All"
        onClick={ ({ target: { value } }) => onClick(value) }
      >
        All
      </button>
      {filteredCategories !== null && filteredCategories.map((category, index) => (
        <button
          data-testid={ `${category}-category-filter` }
          onClick={ ({ target: { value } }) => onClick(value) }
          type="button"
          value={ category }
          key={ `${index}-${category}` }
        >
          { category }
        </button>
      ))}
    </div>
  );
}

export default FoodFilterCategories;

FoodFilterCategories.propTypes = {
  categories: PropTypes.arrayOf().isRequired,
};
