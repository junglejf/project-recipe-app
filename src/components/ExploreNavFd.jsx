// React
import React, { useEffect, useState } from 'react';

// Router
import { withRouter } from 'react-router';

// PropTypes
import PropTypes from 'prop-types';

// Helpers
import capitalize from '../helpers/capitalizeStr';

// Services
import { randomRecipeAPI } from '../services/apiRequest';

const ExploreNavFd = (props) => {
  // Props
  const { foodDrink, history } = props;

  const foodDrinkCap = capitalize(foodDrink).slice(0, foodDrink.length - 1);
  const foodDrinkPT = foodDrink === 'meals' ? 'comidas' : 'bebidas';

  // State Hooks
  const [surpriseId, setSurpriseId] = useState('');

  useEffect(() => {
    const fetchSurprise = async () => {
      const random = await randomRecipeAPI(foodDrink);
      setSurpriseId(random[`id${foodDrinkCap}`]);
    };
    fetchSurprise();
  }, [foodDrink, foodDrinkCap]);

  return (
    <>
      {/* Explorar por ingredientes */}
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push(`/explorar/${foodDrinkPT}/ingredientes`) }
      >
        Por Ingredientes
      </button>

      {/* Explorar por local de origem */}
      { foodDrink === 'meals' && (
        <button
          type="button"
          data-testid="explore-by-area"
          onClick={ () => history.push('/explorar/comidas/area') }
        >
          Por Local de Origem
        </button>
      ) }

      {/* Receita aleatória */}
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => history.push(`/${foodDrinkPT}/${surpriseId}`) }
      >
        Me Surpreenda!
      </button>
    </>
  );
};

ExploreNavFd.propTypes = {
  foodDrink: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(ExploreNavFd);
