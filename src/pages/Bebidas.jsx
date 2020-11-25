import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import RecipesAppContext from '../hooks/RecipesAppContext';
import Footer from '../components/Footer';
import CardsDrink from '../components/CardsDrink';

function Bebidas({ history }) {
  const {
    cards: {
      cardDrink,
    },
  } = useContext(RecipesAppContext);

  if (cardDrink.length === 1) {
    const { idDrink } = cardDrink[0];
    history.push(`/bebidas/${idDrink}`);
  }

  const buttonIs = true;

  return (
    <div>
      <Header name="Bebidas" button={ buttonIs } />
      <CardsDrink />
      <Footer />
    </div>
  );
}

Bebidas.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Bebidas;
