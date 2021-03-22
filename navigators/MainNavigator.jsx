import React, { useState } from 'react';

import api from '../api/index';

import LoggedNavigator from './LoggedNavigator.jsx';
import Login from '../screens/Login.jsx';

function useSession() {
  const [isLogged, setIsLogged] = useState(false);

  function login(email, password) {
    api.auth.login(email, password)
      .then(({ data: { token: responseToken } = {} }) => {
        api.auth.setToken(responseToken);
        setIsLogged(api.auth.isLogged());
      });
  }

  function logout() {
    api.auth.resetToken();
    setIsLogged(api.auth.isLogged());
  }

  return { login, logout, isLogged };
}

export default function MainNavigator() {
  const { login, logout, isLogged } = useSession();

  if (isLogged) {
    return <LoggedNavigator logout={logout} />;
  }

  return (
    <Login login={login} />
  );
}
