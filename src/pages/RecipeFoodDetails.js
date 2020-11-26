import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/RecipesAppContext';
import './scroll.css';

function RecipeFoodDetails({ match }) {
  const { id } = match.params;
  const { recipes, setRecipes } = useContext(RecipesContext);
  const [recomendation, setRecomendation] = useState([]);
  let arrIngredient = [];
  let arrMeasure = [];
  const API = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

  const fetchDetailRecipeFoodByID = async () => {
    const response = await fetch(`${API}${id}`);
    const json = await response.json();
    return setRecipes(json.meals);
  };

  const fetchRecomendationsDrinks = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    // https://www.thecocktaildb.com/api/json/v1/1/search.php?s=
    const json = await response.json();
    return setRecomendation(json.drinks);
  };
  useEffect(() => {
    fetchDetailRecipeFoodByID();
    fetchRecomendationsDrinks();
  }, []);

  if (recipes.length !== 0) {
    const renderIngredients = () => {
      for (let i = 1; i <= 20; i++) {
        if (recipes[0][`strIngredient${i}`]) {
          arrIngredient = arrIngredient.concat(recipes[0][`strIngredient${i}`]);
        } else {
          break;
        }
      }
    };

    const renderMeasure = () => {
      for (let i = 1; i <= 20; i++) {
        if (recipes[0][`strMeasure${i}`]) {
          arrMeasure = arrMeasure.concat(recipes[0][`strMeasure${i}`]);
        } else {
          break;
        }
      }
    };
    renderMeasure();
    renderIngredients();

    return (
      <div>
        <img
          data-testid="recipe-photo"
          src={ recipes[0].strMealThumb }
          alt={ recipes[0].strMeal }
        />
        <h4 data-testid="recipe-title">
          {' '}
          { recipes[0].strMeal }
          {' '}
        </h4>
        <button type="button" data-testid="share-btn">Compartilhar</button>
        <button type="button" data-testid="favorite-btn">Favoritar</button>
        <p data-testid="recipe-category">{recipes[0].strCategory}</p>
        <ul>
          {arrIngredient.map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { ingredient }
            </li>
          ))}
        </ul>
        <ul>
          {arrMeasure.map((measure, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { measure }
            </li>
          ))}
        </ul>
        <p data-testid="instructions">{recipes[0].strInstructions}</p>
        <iframe
          title="Este é um titulo unico"
          data-testid="video"
          width="280"
          height="150"
          src={ recipes[0].strYoutube }
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media"
          allowFullScreen
        />
        <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>

        <div className="scrollmenu">
          {recomendation.slice(0, 6).map((element, index) => (
            <div key={ index } className="scrollmenu-child">
              <img
                data-testid={ `${index}-recomendation-card` }
                src={ element.strDrinkThumb }
                alt={ element.strDrink }
              />
              <p data-testid={ `${index}-recomendation-title` }>{ element.strDrink }</p>
            </div>
          ))}
        </div>

      </div>
    );
  }

  return <span>Ops...</span>;
}

export default RecipeFoodDetails;
