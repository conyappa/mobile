import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

import api from '@/api';
import { getData, removeData, storeData } from '@/utils/local-storage';
import { useStoreSession } from '@/store/session.jsx';

import { setCredentials, removeCredentials } from '@/utils/credentials';
import { USER_ID_STORAGE_KEY, REFRESH_SECURE_STORE_KEY } from '@/utils/constants';

const refreshCredentials = async () => {
  const refreshToken = await SecureStore.getItemAsync(REFRESH_SECURE_STORE_KEY);
  const { data: { access, refresh } = {} } = await api.auth.refresh(refreshToken);
  if (!access || !refresh) {
    throw new Error('Error refreshing the tokens');
  }
  await setCredentials(access, refresh);
};

export default function useSession() {
  const [, setIsLoggedIn] = useStoreSession();
  const [userId, setUserId] = useState(null);
  const [checkedLocal, setCheckedLocal] = useState(false);

  async function login(email, password) {
    try {
      const { data: { access, refresh, id } = {} } = await api.auth.login(email, password);
      await setCredentials(access, refresh);
      await storeData({ [USER_ID_STORAGE_KEY]: id });
      setUserId(id);
      setIsLoggedIn(true);
      return {};
    } catch (error) {
      const processedError = (
        'code' in error
          ? error.code // timeout
          : error.response.status // HTTP error
      );
      return { error: processedError };
    }
  }

  async function logout() {
    await Promise.all([
      removeCredentials(),
      removeData([USER_ID_STORAGE_KEY]),
    ]);

    setIsLoggedIn(false);
    setUserId(null);
  }

  useEffect(() => {
    async function refreshInternalCredentials() {
      try {
        const [{ [USER_ID_STORAGE_KEY]: id }] = await Promise.all([
          getData([USER_ID_STORAGE_KEY]),
          refreshCredentials(),
        ]);
        setUserId(id);
        setIsLoggedIn(true);
      } catch (err) {
        setIsLoggedIn(false);
      }
      setCheckedLocal(true);
    }

    refreshInternalCredentials();
  }, [setIsLoggedIn]);

  return {
    login, logout, userId, checkedLocal,
  };
}
