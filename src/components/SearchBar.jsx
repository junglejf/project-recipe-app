// React
import React, { useEffect, useState } from 'react';

// Router
import { useLocation } from 'react-router';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../redux/actions';

function SearchBar() {
  const [searchText, setSearchText] = useState('');
  const [searchFilter, setSearchFilter] = useState('ingredient');

  const path = useLocation().pathname.split('/')[1];

  const dispatch = useDispatch();
  const meals = useSelector((state) => state.recipes.results.meals);
  console.log(meals);

  useEffect(() => {
    if (!meals) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [meals]);

  const handleSubmit = () => {
    if (searchFilter === 'first-letter' && searchText.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      dispatch(fetchRecipes(searchText, searchFilter, path));
    }
  };

  return (
    <form className="search-bar">
      <input
        type="text"
        placeholder="Buscar Receita"
        id="search-input"
        data-testid="search-input"
        value={ searchText }
        onChange={ ({ target: { value } }) => setSearchText(value) }
      />
      <div>
        <label htmlFor="ingredient">
          Ingrediente
          <input
            id="ingredient"
            value="ingredient"
            type="radio"
            name="search-filter"
            data-testid="ingredient-search-radio"
            onChange={ ({ target: { value } }) => setSearchFilter(value) }
          />
        </label>
        <label htmlFor="name">
          Nome
          <input
            id="name"
            value="name"
            type="radio"
            name="search-filter"
            data-testid="name-search-radio"
            onChange={ ({ target: { value } }) => setSearchFilter(value) }
          />
        </label>
        <label htmlFor="first-letter">
          Primeira Letra
          <input
            id="first-letter"
            value="first-letter"
            type="radio"
            name="search-filter"
            data-testid="first-letter-search-radio"
            onChange={ ({ target: { value } }) => setSearchFilter(value) }
          />
        </label>
      </div>
      <button
        onClick={ () => handleSubmit() }
        disabled={ searchText.length < 1 }
        type="button"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </form>
  );
}

export default SearchBar;
