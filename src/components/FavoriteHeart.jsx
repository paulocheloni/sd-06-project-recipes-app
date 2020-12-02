import React, { useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../styles/images/whiteHeartIcon.svg';
import blackHeartIcon from '../styles/images/blackHeartIcon.svg';
import { saveState, loadState } from '../services/localStorage';

function FavoriteHeart({ id, detailsDrink, detailsFood }) {
  const favoriteRecipe = 'favoriteRecipes';
  const responseFavoriteStorage = loadState(favoriteRecipe, [])
    .some((element) => element.id === id);
  const [favoriteButton, setFavoriteButton] = useState(responseFavoriteStorage);

  const favoriteMark = () => {
    if (favoriteButton === false) {
      setFavoriteButton(true);
    } else {
      setFavoriteButton(false);
    }
  };

  const saveFavoriteRecipe = () => {
    const loadFavoriteRecipe = loadState(favoriteRecipe, []);

    const response = loadFavoriteRecipe.filter((element) => element.id !== id);

    let payload = {};

    if (loadFavoriteRecipe.length > response.length) {
      saveState(favoriteRecipe, response);
    } else if (detailsDrink) {
      const {
        idDrink,
        strCategory,
        strDrink,
        strDrinkThumb,
        strAlcoholic,
      } = detailsDrink;

      payload = {
        id: idDrink,
        type: 'bebida',
        area: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
      };
      saveState(favoriteRecipe, [...loadFavoriteRecipe, payload]);
    } else if (detailsFood) {
      const {
        idMeal,
        strArea,
        strCategory,
        strMeal,
        strMealThumb,
      } = detailsFood;

      payload = {
        id: idMeal,
        type: 'comida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      };
      saveState(favoriteRecipe, [...loadFavoriteRecipe, payload]);
    }
    favoriteMark();
  };

  return (
    favoriteButton ? (
      <button type="button" onClick={ saveFavoriteRecipe }>
        <img
          data-testid="favorite-btn"
          src={ blackHeartIcon }
          alt="img-button-fav"
        />
      </button>
    ) : (
      <button type="button" onClick={ saveFavoriteRecipe }>
        <img
          data-testid="favorite-btn"
          src={ whiteHeartIcon }
          alt="img-button-fav"
        />
      </button>
    )
  );
}

FavoriteHeart.propTypes = {
  id: PropTypes.string.isRequired,
  detailsDrink: PropTypes.shape({
    idDrink: PropTypes.string.isRequired,
    strCategory: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
    strAlcoholic: PropTypes.string.isRequired,
  }).isRequired,
  detailsFood: PropTypes.shape({
    idMeal: PropTypes.string.isRequired,
    strArea: PropTypes.string.isRequired,
    strCategory: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
  }).isRequired,

};

export default FavoriteHeart;