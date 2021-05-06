import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

import api from '@/api';
import { getData, removeData, storeData } from '@/utils/local-storage';

const ACCESS_SECURE_STORE_KEY = 'accessSecureStoreKey';
const REFRESH_SECURE_STORE_KEY = 'refreshSecureStoreKey';
const USER_ID_STORAGE_KEY = 'userIdStorageKey';

export default function useSession() {
  const [isLogged, setIsLogged] = useState(false);
  const [userId, setUserId] = useState(null);
  const [checkedLocal, setCheckedLocal] = useState(false);

  async function setCredentials(accessToken, refreshToken) {
    await Promise.all([
      SecureStore.setItemAsync(ACCESS_SECURE_STORE_KEY, accessToken),
      SecureStore.setItemAsync(REFRESH_SECURE_STORE_KEY, refreshToken),
    ]);
  }

  async function login(email, password) {
    try {
      const { data: { access, refresh, id } = {} } = await api.auth.login(email, password);
      await setCredentials(access, refresh);
      await storeData({ [USER_ID_STORAGE_KEY]: id });
      setUserId(id);
      setIsLogged(true);
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
      SecureStore.deleteItemAsync(ACCESS_SECURE_STORE_KEY),
      SecureStore.deleteItemAsync(REFRESH_SECURE_STORE_KEY),
      removeData([USER_ID_STORAGE_KEY]),
    ]);

    setIsLogged(false);
    setUserId(null);
  }

  useEffect(() => {
    async function refreshCredentials() {
      try {
        const [refreshToken, id] = await Promise.all([
          SecureStore.getItemAsync(REFRESH_SECURE_STORE_KEY),
          getData(USER_ID_STORAGE_KEY),
        ]);
        const { data: { access, refresh } = {} } = await api.auth.refresh(refreshToken);
        await setCredentials(access, refresh);
        setUserId(id);
        setIsLogged(true);
      } catch (err) {
        setIsLogged(false);
      }
    }

    refreshCredentials();
    setCheckedLocal(true);
  }, []);

  return {
    login, logout, isLogged, userId, checkedLocal,
  };
}
