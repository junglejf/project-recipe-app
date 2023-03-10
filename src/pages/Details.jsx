// React
import React, { useEffect, useState } from 'react';

// Router
import { useLocation, useHistory, useParams } from 'react-router-dom';

// PropTypes
import PropTypes from 'prop-types';

// Services
import { Modal } from 'react-bootstrap';
import { detailsAPI } from '../services/apiRequest';

// HelpersDetails
import capitalize from '../helpers/capitalizeStr';
import renderRecs from '../helpers/renderRecs';
import newRecipe from '../helpers/newRecipe';
import checkFavorite from '../helpers/checkFavorite';

// Styles
import '../styles/Details.css';

// Components
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import RenderIngredients from '../components/RenderIngredients';

function Details({ foodDrink = '' }) {
  const history = useHistory(); // History

  const path = useLocation().pathname; // Rota
  const { id } = useParams(); // Id da receita
  const foodDrinkPT = path.split('/')[1]; // Comida ou Bebida
  const foodDrinkCap = capitalize(foodDrink).slice(0, foodDrink.length - 1);

  const [details, setDetails] = useState(); // Detalhes
  const [loading, setLoading] = useState(false); // Carregando
  const [isFavorite, setIsFavorite] = useState(false); // Favoritado
  const [showModal, setShowModal] = useState(false); // Mostrar mensagem
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [recs, setRecs] = useState(); // Recomendados

  /* Fetch dos detalhes e das receitas recomendadas */
  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      const data = await detailsAPI(id, foodDrinkPT);
      setDetails(data[foodDrink][0]);
      setLoading(false);
      setRecs(await renderRecs(foodDrinkPT));
    };
    fetchRecipe();
  }, [path, id, foodDrinkPT, foodDrink]);

  /* Renderização condicional do texto "iniciar"/"continuar" receita */
  const recipeProgress = () => {
    if (localStorage.getItem('inProgressRecipes')) {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const mealCocktail = foodDrink === 'meals' ? 'meals' : 'cocktails';
      return inProgressRecipes[mealCocktail][id];
    }
    return null;
  };

  /* setIsFavorite */
  useEffect(() => checkFavorite(id, setIsFavorite), [id, isFavorite]);

  /* Gerencia as receitas favoritas */
  const manageFavorites = () => {
    if (isFavorite) { // Caso seja favorito - desfavoritar
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const removed = favoriteRecipes.filter((recipe) => recipe.id !== id);

      localStorage.setItem('favoriteRecipes', JSON.stringify(removed));
      setIsFavorite(false);
    } else {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

      favoriteRecipes.push(newRecipe(
        details,
        foodDrink,
        foodDrinkPT,
        foodDrinkCap,
      ));

      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      setIsFavorite(true);
    }
  };

  return (
    <section>
      {/* Carregando */}
      { loading && <span>Carregando...</span> }
      { details && (
        <>
          {/* Thumb */}
          <img
            src={ details[`str${foodDrinkCap}Thumb`] }
            alt={ details[`str${foodDrinkCap}`] }
            className="details-thumb"
            data-testid="recipe-photo"
          />

          {/* Título */}
          <h1 className="details-title" data-testid="recipe-title">
            { details[`str${foodDrinkCap}`] }
          </h1>

          {/* Compartilhar */}
          <ShareButton
            handleShowModal={ handleShowModal }
            foodDrink={ foodDrinkPT }
            id={ id }
          />

          {/* Favoritar */}
          <FavoriteButton isFavorite={ isFavorite } manageFavorites={ manageFavorites } />

          {/* Categoria */}
          <span className="details-category" data-testid="recipe-category">
            {
              foodDrink === 'drinks' ? (
                details.strAlcoholic
              ) : (
                details.strCategory
              )
            }
          </span>

          {/* Ingredientes */}
          <ol>
            <RenderIngredients data={ details } />
          </ol>

          {/* Instruções */}
          <h1>Instructions</h1>
          <p className="details-instructions" data-testid="instructions">
            { details.strInstructions }
          </p>

          {/* Vídeo YT */}
          { foodDrink === 'meals' && (
            <iframe
              title={ `How to prepare ${details[`str${foodDrinkCap}`]}` }
              data-testid="video"
              src={ (details.strYoutube.replace('watch?v=', 'embed/')) }
              allowFullScreen
            />
          )}

          {/* Carrossel de receitas recomendadas */}
          <div className="details-carousel">
            { recs }
          </div>

          {/* Iniciar receita */}
          <button
            type="button"
            className="details-start"
            data-testid="start-recipe-btn"
            onClick={ () => history.push(`${path}/in-progress`) }
          >
            { recipeProgress() ? 'Continuar Receita' : 'Iniciar Receita' }
          </button>
          <Modal show={ showModal } onHide={ handleCloseModal }>
            <Modal.Header closeButton>
              Link copiado!
            </Modal.Header>
          </Modal>
        </>
      )}
    </section>
  );
}

Details.propTypes = {
  foodDrink: PropTypes.string,
}.isRequired;

export default Details;
