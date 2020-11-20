/* eslint-disable react/jsx-curly-spacing */
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

const checkLogin = (email, passwordInput) => {
  const validEmail = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{3})$/i);
  const validPassword = passwordInput.length > 6;
  if (validEmail && validPassword) return false;
  return true;
};

function Login() {
  const [email, setEmail] = useState('');
  const [passwordInput, setpasswordInput] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setIsDisabled(checkLogin(email, passwordInput));
  }, [email, passwordInput]);

  const handleInput = (event) => {
    const { name, value } = event.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setpasswordInput(value);
  };

  const handleLoginClick = () => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    const user = { email };
    localStorage.setItem('user', JSON.stringify(user));
    setRedirect(true);
  };

  if (redirect) return <Redirect to="/comidas" />;

  return (
    <main>
      <p>Login</p>
      <div>
        <input
          type="email"
          name="email"
          value={ email }
          placeholder="Email"
          data-testid="email-input"
          onChange={ (event) => handleInput(event) }
        />
        <input
          type="password"
          name="password"
          value={ passwordInput }
          placeholder="Senha"
          data-testid="password-input"
          onChange={ (event) => handleInput(event) }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          onClick={ handleLoginClick }
          disabled={ isDisabled }
        >
          Entrar
        </button>
      </div>
    </main>
  );
}

export default Login;
