import React from 'react';

// PropTypes
import PropTypes from 'prop-types';

// Images
import emptyHeart from '../images/whiteHeartIcon.svg';
import fullHeart from '../images/blackHeartIcon.svg';

function FavoriteButton({ isFavorite, manageFavorites }) {
  return (
    <button
      type="button"
      className="details-favorites-btn"
      onClick={ () => manageFavorites() }
    >
      <img
        data-testid="favorite-btn"
        src={ isFavorite ? fullHeart : emptyHeart }
        alt={ isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos' }
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  isFavorite: PropTypes.bool,
  manageFavorites: PropTypes.func,
}.isRequired;

export default FavoriteButton;
