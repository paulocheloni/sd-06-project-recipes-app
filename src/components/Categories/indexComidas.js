import React, { useContext } from 'react';
import ContextAPI from '../../Context/ContextAPI';

import {
  showAllFoodsInCategories,
} from '../../services/aPI';

const CategoriesComidas = () => {
  const { apiValueSearch, setApiValueSearch, categories } = useContext(ContextAPI);
  const getSugestedFoods = async () => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((foods) => foods.json())
      .then((foods) => setApiValueSearch({ ...apiValueSearch, foods, value: '' }));
  };

  const filterApiValueSearch = async (value) => {
    if (apiValueSearch.value === value) {
      getSugestedFoods();
    } else {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`)
        .then((foods) => foods.json())
        .then((foods) => setApiValueSearch({ ...apiValueSearch, foods, value }));
    }
  };

  const showAllFoods = async (value) => {
    if (apiValueSearch.value === value) {
      getSugestedFoods();
    } else {
      const categoriesRecipes = await showAllFoodsInCategories();
      const categoriesResult = categoriesRecipes.categories;
      setApiValueSearch({ ...apiValueSearch, categoriesResult, value });
    }
  };

  return !categories.meals ? (
    <p>loading</p>
  ) : (
    <div>
      {categories.meals.map((element, index) => {
        const number = 4;
        if (index <= number) {
          return (
            <div>
              <button
                key={ element.idCategory }
                type="button"
                name={ element.strCategory }
                data-testid={ `${element.strCategory}-category-filter` }
                onClick={ (e) => filterApiValueSearch(e.target.name) }
              >
                { element.strCategory }
              </button>
            </div>

          );
        }
        return '';
      })}
      <button data-testid="All-category-filter" type="button" id="All" onClick={ (e) => showAllFoods(e.target.id) }>All</button>
    </div>);
};

export default CategoriesComidas;
