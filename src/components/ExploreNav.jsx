// React
import React from 'react';

// Router
import { withRouter } from 'react-router';

// PropTypes
import PropTypes from 'prop-types';

const ExploreNav = ({ history }) => (
  <>
    {/* Ir para tela de explorar comidas */}
    <button
      type="button"
      data-testid="explore-food"
      onClick={ () => history.push('/explorar/comidas') }
    >
      Explorar Comidas
    </button>

    {/* Ir para tela de explorar bebidas */}
    <button
      type="button"
      data-testid="explore-drinks"
      onClick={ () => history.push('/explorar/bebidas') }
    >
      Explorar Bebidas
    </button>
  </>
);

ExploreNav.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(ExploreNav);
