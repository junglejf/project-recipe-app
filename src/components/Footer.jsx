// React
import React from 'react';

// Router
import { useHistory } from 'react-router-dom';

// Icons
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();

  // remover o style do FOOTER
  return (
    <footer
      data-testid="footer"
      style={ { position: 'fixed',
        bottom: 0 } }
    >
      <button
        type="button"
        onClick={ () => history.push('/bebidas') }
      >
        <img
          src={ drinkIcon }
          alt="Drink icon button"
          data-testid="drinks-bottom-btn"
        />
      </button>
      <button
        type="button"
        onClick={ () => history.push('/explorar') }
      >
        <img
          src={ exploreIcon }
          alt="Explore icon button"
          data-testid="explore-bottom-btn"
        />
      </button>
      <button
        type="button"
        onClick={ () => history.push('/comidas') }
      >
        <img
          src={ mealIcon }
          alt="Food icon button"
          data-testid="food-bottom-btn"
        />
      </button>
    </footer>

  );
}

export default Footer;
