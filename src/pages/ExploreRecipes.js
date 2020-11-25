import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreRecipes() {
  const history = useHistory();
  const location = useLocation().pathname;

  const randomRecipe = async () => {
    let result = '';
    if (location.includes('comidas')) {
      const apiRequest = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const response = await apiRequest.json();
      const responseId = response.meals[0].idMeal;
      result = history.push(`/comidas/${responseId}`);
    } else {
      const apiRequest = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      const response = await apiRequest.json();
      const responseId = response.drinks[0].idDrink;
      result = history.push(`/bebidas/${responseId}`);
    }
    return result;
  };

  return (
    <div>
      { (location.includes('comidas')) ? (
        <div>
          <Header title="Explorar Comidas" />
          <button
            data-testid="explore-by-ingredient"
            type="button"
            onClick={ () => history.push('/explorar/comidas/ingredientes') }
          >
            Por Ingredientes
          </button>
          <button
            data-testid="explore-by-area"
            type="button"
            onClick={ () => history.push('/explorar/comidas/area') }
          >
            Por Local de Origem
          </button>
          <button
            data-testid="explore-surprise"
            type="button"
            onClick={ () => randomRecipe() }
          >
            Me Surpreenda!
          </button>
          <Footer />
        </div>
      ) : (
        <div>
          <Header title="Explorar Bebidas" />
          <button
            data-testid="explore-by-ingredient"
            type="button"
            onClick={ () => history.push('/explorar/bebidas/ingredientes') }
          >
            Por Ingredientes
          </button>
          <button
            data-testid="explore-surprise"
            type="button"
            onClick={ () => randomRecipe() }
          >
            Me Surpreenda!
          </button>
          <Footer />
        </div>) }
    </div>
  );
}

export default ExploreRecipes;
