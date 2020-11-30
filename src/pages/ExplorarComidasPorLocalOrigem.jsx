import React, { useContext, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import ReceitasContext from '../context/ReceitasContext';
import fetchFood from '../servicesAPI/foodAPI';
import Card from '../components/Card';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExplorarComidasPorLocalOrigem() {
  const { setDisabledSearchIcon, setRecipesMeals, recipesMeals,
    setTitleHeader, setShowSearchBar,
    isFetching, setIsFetching } = useContext(ReceitasContext);
  const [areas, setAreas] = useState([]);
  const [filterArea, setFilterArea] = useState('');
  const twelve = 12;

  useEffect(() => {
    setDisabledSearchIcon(false);
    setTitleHeader('Explorar Origem');
    setShowSearchBar(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsFetching(true);
    const firstRequestAPI = async () => {
      const response = (filterArea === '' || filterArea === 'All')
        ? await fetchFood('itemName', '')
        : await fetchFood('filterByArea', filterArea);
      const areasOption = await fetchFood('byArea', '');
      setAreas(areasOption);
      setIsFetching(false);
      setRecipesMeals(response);
      setIsFetching(false);
    };
    firstRequestAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterArea]);

  return (
    <div>
      <Header />
      <section className="origem-select">
        <select
          onChange={ ({ target }) => setFilterArea(target.value) }
          data-testid="explore-by-area-dropdown"
        >
          <option value="Pesquise por Area">Pesquise por Area</option>
          <option data-testid="All-option" value="All">All</option>
          {isFetching
            ? ''
            : areas.map((area, idx) => (
              <option
                data-testid={ `${area.strArea}-option` }
                key={ idx }
                value={ area.strArea }
              >
                {area.strArea}
              </option>
            ))}
        </select>
      </section>
      <section className="cards-list">
        {isFetching
          ? <h2>Loading...</h2>
          : recipesMeals.map((meal, index) => (
            index < twelve ? <Card
              indexId={ index }
              key={ index }
              imagePath={ meal.strMealThumb }
              itemName={ meal.strMeal }
              id={ meal.idMeal }
              itemType="comidas"
              cardType="recipe"
            />
              : null
          ))}
      </section>
      <Footer />
    </div>
  );
}

export default ExplorarComidasPorLocalOrigem;