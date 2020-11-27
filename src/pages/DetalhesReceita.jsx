import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  requestApiFoodDetails,
} from '../services/requestFood';
import {
  recommendDrinksList,
} from '../services/requestDrink';
import '../styles/Detalhes.css';
import buttonShare from '../styles/images/shareIcon.svg';

function DetalhesReceita(props) {
  const [detailsFood, setDetailsFood] = useState([]);
  const [arrayIngredients, setArrayIngredients] = useState([]);
  const [embed, setEmbed] = useState('');
  const [recommendFood, setRecommendFood] = useState([]);
  const zero = 0;
  const vinte = 20;

  useEffect(() => {
    requestApiFoodDetails(props.match.params.id)
      .then((response) => {
        setDetailsFood(response[0]);
        console.log(response);
      });
  }, []);

  const recommendFoodFunction = async () => {
    if (detailsFood.length !== zero) {
      const response = await recommendDrinksList();
      console.log(response);
      setRecommendFood(response.drinks.slice(zero, 6));
    }
  };

  const embedVideo = () => {
    const youtubeVideo = detailsFood.strYoutube;
    if (youtubeVideo !== undefined) {
      const newYoutube = youtubeVideo.split('=');
      setEmbed(newYoutube[newYoutube.length - 1]);
    }
  };

  const ingredientsFunc = () => {
    if (detailsFood.length !== zero) {
      const array = [];
      for (let i = 1; i <= vinte; i += 1) {
        const detIngredient = `${detailsFood[`strIngredient${i}`]}`;
        const detMeasure = `${detailsFood[`strMeasure${i}`]}`;
        const ingredient = `${detIngredient} ${detMeasure}`;
        array.push(ingredient);
      }
      const arrayReturn = array.filter((element) => element !== '');
      setArrayIngredients(arrayReturn);
    }
  };

  useEffect(() => {
    ingredientsFunc();
    embedVideo();
    recommendFoodFunction();
  }, [detailsFood]);

  if (detailsFood.length === zero) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <img data-testid="recipe-photo" src={ detailsFood.strMealThumb } alt="food-thumb" />
      <h2 data-testid="recipe-title">{detailsFood.strMeal}</h2>
      <h3 data-testid="recipe-category">{detailsFood.strCategory}</h3>
      <h4 data-testid="instructions">{detailsFood.strInstructions}</h4>
      <button type="button" data-testid="share-btn">
        <img src={ buttonShare } alt="button-share" />
      </button>
      <button type="button" data-testid="favorite-btn">Favorite</button>
      {arrayIngredients.map((element, index) => (
        <h5
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ index }
        >
          { element }
        </h5>
      ))}
      <iframe
        data-testid="video"
        width="1042"
        height="586"
        src={ `https://www.youtube.com/embed/${embed}` }
        allow="accelerometer;
        autoplay;
        clipboard-write;
        encrypted-media;
        gyroscope;
        picture-in-picture"
      />
      {/* </iframe> */}
      <div>
        {recommendFood.map((drink, index) => (
          <div key={ index } data-testid={ `${index}-recomendation-card` }>
            <img src={ drink.strDrinkThumb } alt="drink-thumb" />
            <h3>{drink.strDrink}</h3>
          </div>
        ))}
      </div>
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="btn-footer"
      >
        Iniciar receita
      </button>
    </div>
  );
}

DetalhesReceita.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DetalhesReceita;