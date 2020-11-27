import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import DrinkCard from './DrinkCard';
import DrinkFilterCategories from './DrinkFilterCategories';
import '../css/Lists.css';

function DrinkList() {
  const {
    getDrinkAPI,
    drinkData,
    searchInput,
    activeFilter,
  } = useContext(RecipesContext);

  useEffect(() => {
    const { readyToSearch, filterType, query } = searchInput;

    if (readyToSearch) getDrinkAPI(filterType, query);
  }, [searchInput]);

  useEffect(() => {
    getDrinkAPI('name-filter', '');
  }, []);

  const handleDrinkData = () => {
    const maxSize = 12;
    const startIndex = 0;

    if (drinkData.length > maxSize) {
      return drinkData.slice(startIndex, maxSize).map((item, index) => (
        <DrinkCard
          index={ index }
          key={ `recipe${index}` }
          recipe={ item }
          idDrink={ item.idDrink }
        />
      ));
    }

    if (drinkData.length === 1 && activeFilter === '') {
      const { idDrink } = drinkData[startIndex];
      return <Redirect to={ `/bebidas/${idDrink}` } />;
    }

    return drinkData.map((item, index) => (
      <DrinkCard
        index={ index }
        key={ `recipe${index}` }
        recipe={ item }
        idDrink={ item.idDrink }
      />
    ));
  };

  return (
    <section className="recipe-container">
      <DrinkFilterCategories />
      { handleDrinkData() }
    </section>
  );
}

export default DrinkList;