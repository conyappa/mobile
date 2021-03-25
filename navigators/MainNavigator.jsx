import React, { useState } from 'react';

import api from '../api/index';

import LoggedNavigator from './LoggedNavigator.jsx';
import SessionNavigator from './SessionNavigator.jsx';

function useSession() {
  const [isLogged, setIsLogged] = useState(false);
  const [userId, setUserId] = useState(null);

  function login(email, password) {
    api.auth.login(email, password)
      .then(({ data: { token, id } = {} }) => {
        api.auth.setToken(token);

        // Call setUserId before calling setIsLogged
        // so that the LoggedNavigator is not rendered
        // with a valid userId (not null).
        setUserId(id);
        setIsLogged(api.auth.isLogged());
      });
  }

  function logout() {
    api.auth.resetToken();

    // Call setIsLogged before calling setUserId
    // so that the LoggedNavigator is not rendered
    // with a valid userId (not null).
    setIsLogged(api.auth.isLogged());
    setUserId(null);
  }

  return {
    login, logout, isLogged, userId,
  };
}

export default function MainNavigator() {
  const {
    login, logout, isLogged, userId,
  } = useSession();

  if (isLogged) {
    return <LoggedNavigator logout={logout} userId={userId} />;
  }

  return (
    <SessionNavigator login={login} />
  );
}
