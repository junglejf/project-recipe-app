// React
import React, { useState } from 'react';

// Router
import { useHistory } from 'react-router-dom';

// PropTypes
import PropTypes from 'prop-types';

// Images
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

// Children
import SearchBar from './SearchBar';

function Header({ searchBtn, title }) {
  /* Router */
  const history = useHistory();

  /* Mostra a barra de pesquisa */
  const [toggleSearch, setToggleSearch] = useState(false);

  return (
    <>
      <header>
        {/* Ir para a página de Perfíl */}
        <button
          type="button"
          onClick={ () => history.push('/perfil') }
          disabled={ !searchBtn } // Desabilitar quando estiver na tela de perfil
        >
          <img
            src={ profileIcon }
            data-testid="profile-top-btn"
            alt="User person icon"
          />
        </button>

        {/* Título da página */}
        <h2 data-testid="page-title">{ title }</h2>

        {
          searchBtn && (
            <button
              type="button"
              onClick={ () => setToggleSearch(!toggleSearch) }
            >
              <img
                src={ searchIcon }
                alt="Search button icon"
                data-testid="search-top-btn"
              />
            </button>
          )
        }
      </header>
      <div>
        { toggleSearch && <SearchBar /> }
      </div>
    </>
  );
}

Header.propTypes = {
  searchBtn: PropTypes.bool,
  title: PropTypes.string,
}.isRequired;

export default Header;
