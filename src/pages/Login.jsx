// React
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

function Login() {
  /* Retorna um booleano com o estado disabled do botão */
  const disableSubmit = (email, password) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexPassword = /^[a-zA-Z0-9]{7,}/;

    return !(regexEmail.test(email) && regexPassword.test(password));
  };

  const [email, setEmail] = useState(''); // Email
  const [password, setPassword] = useState(''); // Senha
  const [redirect, setRedirect] = useState(false); // Redirect

  const handleSubmit = () => {
    const userValue = { email };

    // Salva informações no localStorage
    localStorage.setItem('user', JSON.stringify(userValue));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);

    // Redireciona para a página de receitas de comidas
    setRedirect(true);
  };

  return (
    redirect ? (
      <Redirect to="/comidas" />
    ) : (
      <form>
        {/* Input Email */}
        <input
          id="email-input"
          type="email"
          data-testid="email-input"
          onChange={ ({ target: { value } }) => setEmail(value) }
          placeholder="Email"
        />
        {/* Input Senha */}
        <input
          id="password-input"
          type="password"
          data-testid="password-input"
          onChange={ ({ target: { value } }) => setPassword(value) }
          placeholder="Senha"
        />
        {/* Botão submit */}
        <button
          id="login-submit-btn"
          data-testid="login-submit-btn"
          type="button"
          disabled={ disableSubmit(email, password) }
          onClick={ () => handleSubmit() }
        >
          Login
        </button>
      </form>
    )
  );
}

export default Login;
