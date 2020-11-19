import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const verifyEmailAndPassword = () => {
    const emailFormat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);
    const passwordMinLength = 7;
    if (password.length >= passwordMinLength && emailFormat) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  useEffect(() => {
    verifyEmailAndPassword();
  }, [email, password]);

  const handleSignUp = (event) => {
    event.preventDefault();
    localStorage.user = JSON.stringify({ email });
    localStorage.mealsToken = JSON.stringify(1);
    localStorage.cocktailsToken = JSON.stringify(1);
    //history.push('/comidas');
  };

  return (
    <div>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="email"
          name="email"
          value={email}
          data-testid="email-input"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={password}
          data-testid="password-input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          data-testid="login-submit-btn"
          type="submit"
          disabled={isDisabled}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
