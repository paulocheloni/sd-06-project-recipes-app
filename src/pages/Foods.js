import React, { useEffect, useContext } from 'react';
import HeaderContext from '../context/HeaderContext';

const Foods = () => {
  const { setTitle } = useContext(HeaderContext);
  useEffect(() => {
    setTitle('Comidas');
  }, []);
  return (
    <div>
      oi
    </div>
  );
};

export default Foods;
