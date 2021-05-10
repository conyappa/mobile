/* eslint-disable import/prefer-default-export */

import * as SecureStore from 'expo-secure-store';

import { ACCESS_SECURE_STORE_KEY } from '@/utils/constants';

export const getAuthHeaders = async () => {
  const accessToken = await SecureStore.getItemAsync(ACCESS_SECURE_STORE_KEY);
  if (accessToken) {
    return { Authorization: `Bearer ${accessToken}` };
  }
  return {};
};
