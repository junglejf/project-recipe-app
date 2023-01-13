// React
import React from 'react';

// PropTypes
import PropTypes from 'prop-types';

// Services
import copy from 'clipboard-copy';

// Images
import shareIcon from '../images/shareIcon.svg';

function ShareButton({ handleShowModal, foodDrink, id }) {
  return (
    <button
      type="button"
      className="details-share-btn"
      data-testid="share-btn"
      onClick={ () => {
        copy(`http://localhost:3000/${foodDrink}/${id}`);
        handleShowModal();
      } }
    >
      <img src={ shareIcon } alt="Copiar Link" />
    </button>
  );
}

ShareButton.propTypes = {
  handleShowModal: PropTypes.func,
}.isRequired;

export default ShareButton;
