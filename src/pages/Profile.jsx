// React
import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';

// Children
import Header from '../components/Header';
import { loadLocalStorage } from '../helpers/localStorageHelper';

function Profile() {
  /* usando useHistory para trocar de pagina */
  const history = useHistory();

  /* função que volta pra pagina inicial e limpa o localStorage */
  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };
  const user = loadLocalStorage('user'); // modificado a linha 24
  return (
    <div>
      <Header title="Perfil" />
      <p data-testid="profile-email">{user.email}</p>
      <Button
        onClick={ () => history.push('/receitas-feitas') }
        data-testid="profile-done-btn"
        variant="secondary"
      >
        Receitas Feitas
      </Button>
      <Button
        onClick={ () => history.push('/receitas-favoritas') }
        data-testid="profile-favorite-btn"
        variant="secondary"
      >
        Receitas Favoritas
      </Button>
      <Button
        onClick={ () => handleLogout() }
        data-testid="profile-logout-btn"
        variant="secondary"
      >
        Sair
      </Button>
      <Footer />
    </div>
  );
}

export default Profile;
