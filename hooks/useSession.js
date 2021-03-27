import { useEffect, useState } from 'react';

import api from '../api';
import { getData, removeData, storeData } from '../utils/local-storage';

const TOKEN_STORAGE_KEY = 'tokenStorageKey';
const USER_ID_STORAGE_KEY = 'userIdStorageKey';

export default function useSession() {
  const [isLogged, setIsLogged] = useState(false);
  const [userId, setUserId] = useState(null);
  const [checkedLocal, setCheckedLocal] = useState(false);

  function setCredentials(token, id) {
    api.auth.setToken(token);

    // Call setUserId before calling setIsLogged
    // so the LoggedNavigator is only rendered
    // with a valid userId (not null).
    setUserId(id);
    setIsLogged(api.auth.isLogged());
  }

  function login(email, password) {
    api.auth.login(email, password)
      .then(({ data: { token, id } = {} }) => {
        setCredentials(token, id);
        storeData({ [TOKEN_STORAGE_KEY]: token, [USER_ID_STORAGE_KEY]: id });
      });
  }

  function logout() {
    api.auth.resetToken();

    // Call setIsLogged before calling setUserId
    // so the LoggedNavigator is only rendered
    // with a valid userId (not null).
    setIsLogged(api.auth.isLogged());
    setUserId(null);
    removeData([TOKEN_STORAGE_KEY, USER_ID_STORAGE_KEY]);
  }

  useEffect(() => {
    async function retrieveCredentials() {
      const {
        [TOKEN_STORAGE_KEY]: token,
        [USER_ID_STORAGE_KEY]: id,
      } = await getData([TOKEN_STORAGE_KEY, USER_ID_STORAGE_KEY]);
      if (token && id) {
        setCredentials(token, id);
      }
      setCheckedLocal(true);
    }

    retrieveCredentials();
  }, []);

  return {
    login, logout, isLogged, userId, checkedLocal,
  };
}
