import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ContextAPI from '../../Context/ContextAPI';
import './styles.css';

const Cards = () => {
  const { apiValueSearch } = useContext(ContextAPI);

  const clickRedirectRecipe = (value) => {
    if (window.location.href === 'http://localhost:3000/comidas') window.location.href = `http://localhost:3000/comidas/${value}`;
    if (window.location.href === 'http://localhost:3000/bebidas') window.location.href = `http://localhost:3000/bebidas/${value}`;
  };

  const showFoodResearch = () => {
    const number = 11;
    if (apiValueSearch.foods.meals && apiValueSearch.foods.meals.length === 1) {
      return (
        apiValueSearch.foods.meals && apiValueSearch.foods.meals.map((meal, index) => {
          if (apiValueSearch.foods.meals === null) { console.log('null'); }
          return (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ meal.strMeal }
            >
              <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
              <img
                data-testid={ `${index}-card-img` }
                width="200"
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
              />
              <button
                type="button"
                onClick={ () => clickRedirectRecipe(meal.idMeal) }
              >
                Detalhes
              </button>
            </div>
          );
        })
      );
    }
    return (
      apiValueSearch.foods.meals && apiValueSearch.foods.meals.map((meal, index) => {
        if (index <= number) {
          if (apiValueSearch.foods.meals === null) { console.log('null'); }
          return (
            <div data-testid={ `${index}-recipe-card` } key={ meal.strMeal }>
              <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
              <img
                data-testid={ `${index}-card-img` }
                width="200"
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
              />
              <button
                type="button"
                onClick={ () => clickRedirectRecipe(meal.idMeal) }
              >
                Detalhes
              </button>
            </div>
          );
        }
        return '';
      })
    );
  };

  const showDrinkResearch = () => {
    const number = 11;
    if (apiValueSearch.drinks.drinks && apiValueSearch.drinks.drinks.length === 1) {
      const drinkID = apiValueSearch.drinks.drinks[0].idDrink;
      window.location.href = `http://localhost:3000/bebidas/${drinkID}`;
    } else {
      return (
        apiValueSearch.drinks.drinks && apiValueSearch.drinks.drinks.map((res, index) => {
          if (index <= number) {
            return (
              <div>
                <div data-testid={ `${index}-recipe-card` } key={ res.idDrink }>
                  <p data-testid={ `${index}-card-name` }>{res.strDrink}</p>
                  <img
                    data-testid={ `${index}-card-img` }
                    width="200"
                    src={ res.strDrinkThumb }
                    alt={ res.strDrink }
                  />
                  <button
                    type="button"
                    onClick={ () => clickRedirectRecipe(res.idDrink) }
                  >
                    Detalhes
                  </button>
                </div>
              </div>
            );
          }
          return '';
        })
      );
    }
  };

  const showFoodCategories = () => (
    apiValueSearch.categoriesResult
    && apiValueSearch.categoriesResult.map((res, index) => (
      <div data-testid={ `${index}-recipe-card` } key={ res.idCategory }>
        <p data-testid={ `${index}-card-name` }>{res.strCategory}</p>
        <img
          data-testid={ `${index}-card-img` }
          width="200"
          src={ res.strCategoryThumb }
          alt={ res.strCategory }
        />
      </div>
    ))
  );

  return window.location.pathname === '/comidas' ? (
    <div>
      { apiValueSearch.value === 'All' ? (showFoodCategories()) : (showFoodResearch()) }
    </div>
  ) : (
    <ul>
      { apiValueSearch.value === 'All' ? (showFoodCategories()) : (showDrinkResearch()) }
    </ul>
  );
};

export default Cards;
