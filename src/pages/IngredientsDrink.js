import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function IngredientsDrink() {
  const FALSE = false;
  return (
    <div>
      <Header title="Explorar Ingredientes" search={ FALSE } />
      <Footer />
    </div>
  );
}

export default IngredientsDrink;
