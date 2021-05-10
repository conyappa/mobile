import * as SecureStore from 'expo-secure-store';

import { ACCESS_SECURE_STORE_KEY, REFRESH_SECURE_STORE_KEY } from '@/utils/constants';

export const setCredentials = async (accessToken, refreshToken) => {
  await Promise.all([
    SecureStore.setItemAsync(ACCESS_SECURE_STORE_KEY, accessToken),
    SecureStore.setItemAsync(REFRESH_SECURE_STORE_KEY, refreshToken),
  ]);
};

export const removeCredentials = async () => {
  await Promise.all([
    SecureStore.deleteItemAsync(ACCESS_SECURE_STORE_KEY),
    SecureStore.deleteItemAsync(REFRESH_SECURE_STORE_KEY),
  ]);
};
