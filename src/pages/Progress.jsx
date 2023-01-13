// React
import React, { useEffect, useState } from 'react';

// Router
import { useHistory, useLocation, useParams } from 'react-router';

// PropTypes
import PropTypes from 'prop-types';

// Helpers
import { Modal } from 'react-bootstrap';
import capitalize from '../helpers/capitalizeStr';
import checkFavorite from '../helpers/checkFavorite';

// Services
import { detailsAPI } from '../services/apiRequest';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import newRecipe from '../helpers/newRecipe';
import RenderCheckbox from '../components/RenderCheckbox';

// Styles
import '../styles/Progress.css';
import { loadLocalStorage, saveLocalStorage } from '../helpers/localStorageHelper';
import { getDate, getTags, getType } from '../helpers/getRecipeHelpers';
import useLocalStorage from '../hooks/useLocalStorage';

function Progress({ foodDrink }) {
  const path = useLocation().pathname; // Caminho atual
  const { id } = useParams(); // Id da receita
  const foodDrinkPT = path.split('/')[1]; // comida ou bebida
  const foodDrinkCap = capitalize(foodDrink).slice(0, foodDrink.length - 1); // Meal ou Drink
  const [loading, setLoading] = useState(false); // Carregando
  const [recipe, setRecipe] = useState(); // Detalhes
  const [isFavorite, setIsFavorite] = useState(false); // Favoritado
  const [favorites, setFavorites] = useLocalStorage('favoriteRecipes', []);
  const [doneRecipe, setDoneRecipe] = useState(true); // Finalizar receita

  const history = useHistory();

  const [showModal, setShowModal] = useState(false); // Mostrar mensagem
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  /* fetch recipe */
  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      const data = await detailsAPI(id, foodDrinkPT);
      setRecipe(data[foodDrink][0]);
      setLoading(false);
    };
    fetchRecipe();
  }, [foodDrink, foodDrinkPT, id]);

  /* setIsFavorite */
  useEffect(() => checkFavorite(id, setIsFavorite), [id, isFavorite]);

  /* Gerencia as receitas favoritas */
  const manageFavorites = () => {
    if (isFavorite) { // Caso seja favorito - desfavoritar
      const removed = favorites.filter((item) => item.id !== id);

      setFavorites(removed);
      setIsFavorite(false);
    } else {
      const newFavorites = [...favorites];
      newFavorites.push(newRecipe(
        recipe,
        foodDrink,
        foodDrinkPT,
        foodDrinkCap,
      ));

      setFavorites(newFavorites);
      setIsFavorite(true);
    }
  };

  const manageAddDoneRecipe = (recipeDone) => {
    const EMPTY_FIELD = '';

    const lastDoneRecipe = {
      id: recipeDone[`id${foodDrinkCap}`],
      type: getType(foodDrinkPT), // type === comida ou bebida
      area: recipeDone.strArea || EMPTY_FIELD,
      category: recipeDone.strCategory || EMPTY_FIELD,
      alcoholicOrNot: recipeDone.strAlcoholic || EMPTY_FIELD,
      name: recipeDone[`str${foodDrinkCap}`],
      image: recipeDone[`str${foodDrinkCap}Thumb`],
      doneDate: getDate(),
      tags: getTags(recipeDone),
    };

    const doneRecipes = loadLocalStorage('doneRecipes') || [];
    const recipeID = doneRecipes
      .findIndex((localStorageRecipe) => localStorageRecipe.id === lastDoneRecipe.id);
    const NOT_FOUND = -1;
    if (recipeID === NOT_FOUND) {
      const addLastDoneRecipe = [...doneRecipes, lastDoneRecipe];
      saveLocalStorage('doneRecipes', addLastDoneRecipe);
    } else {
      doneRecipes[recipeID].doneDate = getDate(); // atualiza a receita feita com a última data que ela foi realizada
      saveLocalStorage('doneRecipes', doneRecipes);
    }
  };

  return (
    <section>
      {loading && <span>Carregando...</span>}
      {recipe && (
        <>
          {/* Thumb */}
          <img
            data-testid="recipe-photo"
            src={ recipe[`str${foodDrinkCap}Thumb`] }
            alt={ recipe[`str${foodDrinkCap}`] }
          />

          {/* Título */}
          <h1 data-testid="recipe-title">{ recipe[`str${foodDrinkCap}`] }</h1>

          {/* Compartilhar */}
          <ShareButton
            handleShowModal={ handleShowModal }
            foodDrink={ foodDrinkPT }
            id={ id }
          />

          {/* Favoritar */}
          <FavoriteButton isFavorite={ isFavorite } manageFavorites={ manageFavorites } />

          {/* Categoria */}
          <h2
            data-testid="recipe-category"
          >
            {foodDrink === 'drinks' ? recipe.strAlcoholic : recipe.strCategory}
          </h2>

          {/* Ingredientes */}
          <ol>
            <RenderCheckbox
              data={ recipe }
              checkbox
              className="progress-done"
              id={ id }
              foodDrink={ foodDrink }
              setDoneRecipe={ setDoneRecipe }
            />
          </ol>

          {/* Instruções */}
          <h1>Instructions</h1>
          <p data-testid="instructions">{recipe.strInstructions}</p>

          {/* Iniciar receita */}
          <button
            type="button"
            className="progress-done"
            data-testid="finish-recipe-btn"
            disabled={ doneRecipe }
            onClick={ () => {
              manageAddDoneRecipe(recipe);
              history.push('/receitas-feitas');
            } }
          >
            Finalizar Receita
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

Progress.propTypes = {
  foodDrink: PropTypes.string,
}.isRequired;
export default Progress;
