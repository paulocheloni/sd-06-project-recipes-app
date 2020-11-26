import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useCopyToClipboard from '../hooks/useCopyToClipboard';
import RecipesContext from '../context/RecipesContext';
import { shareIcon, whiteHeartIcon, blackHeartIcon } from '../images';

function ProcessoBebida() {
  const timeoutTextCopy = 3000;
  const { drinkIngredients } = useContext(RecipesContext);
  const [isCopied, handleCopy] = useCopyToClipboard(timeoutTextCopy);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDisable] = useState(true);
  const [checked, setChecked] = useState({});
  const history = useHistory();
  const idDrink = history.location.pathname.split('/')[2];

  const handleChange = ({ target }) => {
    setChecked({ ...checked, [target.name]: target.checked });
  };

  useEffect(() => {
    async function fetchAPI() {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`);
      const responseJson = await response.json();
      setDataDrinks(responseJson.drinks[0]);
      setIsLoading(false);
    }
    fetchAPI();
  }, [idDrink]);

  useEffect(() => {
    if (localStorage.favoriteRecipes) {
      setIsFavorite(true);
    }
  }, []);

  const handleClick = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      localStorage.favoriteRecipes = JSON.stringify([{
        id: dataDrinks.idDrink,
        type: 'bebida',
        area: '',
        category: dataDrinks.strCategory,
        alcoholicOrNot: dataDrinks.strAlcoholic,
        name: dataDrinks.strDrink,
        image: dataDrinks.strDrinkThumb,
      }]);
    } else {
      localStorage.removeItem('favoriteRecipes');
    }
  };

  return (isLoading) ? <p>Loading</p> : (
    <div>
      <img
        data-testid="recipe-photo"
        src={ dataDrinks.strDrinkThumb }
        alt="Foto da receita"
      />
      <h1
        data-testid="recipe-title"
      >
        { dataDrinks.strDrink }
      </h1>
      <span>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ () => handleCopy(`/bebidas/${idDrink}`) }
        >
          <img
            src={ shareIcon }
            alt="Botão de Compartilhar"
          />
        </button>
        { isCopied ? <p>Link copiado!</p> : true }
      </span>
      <button
        type="button"
        onClick={ handleClick }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="Botão de Favorito"
        />
      </button>
      <p data-testid="recipe-category">
        Categoria
      </p>
      {drinkIngredients.map((ingredient, index) => (
        <span
          key={ index }
          data-testid={ `${index}-ingredient-step` }
        >
          {ingredient}
          <input
            type="checkbox"
            name={ ingredient }
            checked={ checked[ingredient[ingredient.name]] }
            onChange={ handleChange }
          />
        </span>
      ))}
      <p data-testid="instructions">
        Instruções
      </p>
      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ isDisable }
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
}

export default ProcessoBebida;