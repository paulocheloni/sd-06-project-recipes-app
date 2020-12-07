import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { requestApiFoodDetails } from '../services/requestFood';
import buttonShare from '../styles/images/shareIcon.svg';
import FavoriteHeart from '../components/FavoriteHeart';
import '../styles/Processos.css';
import { loadState, saveState } from '../services/localStorage';

function ProcessoReceita({ match: { params: { id } }, history }) {
  const zero = 0;
  const vinte = 20;
  const [detailsFood, setDetailsFood] = useState([]);
  const [arrayIngredients, setArrayIngredients] = useState([]);
  const [countCheck, setCountCheck] = useState(zero);

  const initialValueArrayCheckBox = () => {
    const arrayVoid = [];
    const loadStateStorage = loadState('inProgressRecipes', { meals: {
      [id]: arrayVoid } });
    if (Object.keys(loadStateStorage)
      .some((key) => key === 'meals')
    && Object.keys(loadStateStorage.meals)
      .some((key) => key === id)) {
      return loadStateStorage.meals[id];
    }
    return arrayVoid;
  };

  const [arrayCheckBox, setArrayCheckBox] = useState(initialValueArrayCheckBox());

  useEffect(() => {
    requestApiFoodDetails(id)
      .then((response) => {
        setDetailsFood(response[0]);
        console.log(response[0]);
      });
  }, []);

  useEffect(() => {
    const loadStorage = loadState('inProgressRecipes', {});
    saveState('inProgressRecipes', {
      ...loadStorage,
      meals:
        { ...loadStorage.meals, [id]: [...arrayCheckBox] },
    });
  }, [arrayCheckBox]);

  const ingredientsFunc = () => {
    if (detailsFood.length !== zero) {
      const array = [];
      for (let i = 1; i <= vinte; i += 1) {
        const detIngredient = `${detailsFood[`strIngredient${i}`]}`;
        // const detMeasure = `${detailsFood[`strMeasure${i}`]}`;
        const ingredient = `${detIngredient}`;
        array.push(ingredient);
      }
      const arrayReturn = array.filter((element) => element !== '' && element !== 'null');
      setArrayIngredients(arrayReturn);
    }
  };

  const riskCheckBox = (event, element) => {
    const checkBox = document.getElementById(`${event.target.id}`);
    if (checkBox.checked) {
      const labelBox = document.getElementsByName(`${event.target.id}`);
      labelBox[0].className = 'riscado';
      setCountCheck(countCheck + 1);
      setArrayCheckBox([...arrayCheckBox, element]);
    } else {
      setCountCheck(countCheck - 1);
      const filterArrayCheckBox = arrayCheckBox
        .filter((ingredient) => ingredient !== element);
      setArrayCheckBox(filterArrayCheckBox);
    }
  };

  // refatorar em componente no futuro
  const copyBoard = () => {
    const url = `http://localhost:3000/comidas/${id}`;
    const input = document.body.appendChild(document.createElement('input'));
    input.value = url;
    input.select();
    document.execCommand('copy');
    input.parentNode.removeChild(input);
    const divBtns = document.getElementById('btns');
    const newSpan = document.createElement('span');
    newSpan.innerHTML = 'Link copiado!';
    divBtns.appendChild(newSpan);
  };

  useEffect(() => {
    ingredientsFunc();
  }, [detailsFood]);

  const onClickDone = () => {
    const today = new Date();
    const date = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

    const {
      strCategory,
      strArea,
      strMeal,
      strMealThumb,
      strTags,
    } = detailsFood;
    const tag = strTags ? strTags.split(',') : null;
    saveState('doneRecipes', [
      ...loadState('doneRecipes', []),
      {
        id,
        type: 'comida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
        doneDate: date,
        tags: tag,
      },
    ]);
    history.push('/receitas-feitas');
  };

  if (detailsFood.length === zero) {
    return (
      <div>Loading...</div>);
  }

  return (
    <div>
      <img data-testid="recipe-photo" src={ detailsFood.strMealThumb } alt="food-thumb" />
      <h2 data-testid="recipe-title">{ detailsFood.strMeal }</h2>
      <h3 data-testid="recipe-category">{ detailsFood.strCategory }</h3>
      <div id="btns">
        <button type="button" data-testid="share-btn" onClick={ copyBoard }>
          <img src={ buttonShare } alt="button-share" />
        </button>
        <FavoriteHeart id={ id } detailsFood={ detailsFood } />
      </div>
      {arrayIngredients.map((element, index) => {
        const checked = arrayCheckBox.some((checkElement) => checkElement === element);
        return (
          <label
            htmlFor={ index }
            key={ index }
            data-testid={ `${index}-ingredient-step` }
            name={ index }
          >
            <input
              type="checkbox"
              id={ index }
              name="scales"
              checked={ checked }
              onChange={ (event) => riskCheckBox(event, element) }
            />
            { element}
          </label>
        );
      })}
      <h4 data-testid="instructions">{detailsFood.strInstructions}</h4>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ arrayIngredients.length !== countCheck }
        onClick={ () => onClickDone() }
      >
        Finalizar receita
      </button>
    </div>
  );
}

ProcessoReceita.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape.isRequired,
};

export default ProcessoReceita;