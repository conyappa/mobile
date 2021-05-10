import axios from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

import { getAuthHeaders } from '@/utils/auth';
import { setCredentials, removeCredentials } from '@/utils/credentials';
import {
  STAGING_BASE_URL,
  PRODUCTION_BASE_URL,
  REFRESH_SECURE_STORE_KEY,
} from '@/utils/constants';

let baseURL;

const defaultHost = Constants.manifest.debuggerHost ? Constants.manifest.debuggerHost.split(':').shift() : 'localhost';
const developmentURL = Constants.manifest.extra.DEVELOPMENT_URL || `http://${defaultHost}:8000/v2`;

if (__DEV__) { // eslint-disable-line no-undef
  baseURL = developmentURL;
} else if (Constants.manifest.releaseChannel === 'production') {
  baseURL = PRODUCTION_BASE_URL;
} else {
  baseURL = STAGING_BASE_URL;
}

const client = axios.create({
  baseURL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
  transformResponse: [
    ...axios.defaults.transformResponse,
    (data) => camelizeKeys(data),
  ],
  transformRequest: [
    (data) => decamelizeKeys(data),
    ...axios.defaults.transformRequest,
  ],
});

client.interceptors.request.use(async (config) => {
  const authHeaders = await getAuthHeaders();
  const { params, headers } = config;
  return {
    ...config,
    params: decamelizeKeys(params),
    headers: { ...headers, ...authHeaders },
  };
});

client.interceptors.response.use(null, async (error) => {
  if (
    error.config
    && !error.config.url.includes('refresh')
    && error.response
    && error.response.status === 401
  ) {
    try {
      const refreshToken = await SecureStore.getItemAsync(REFRESH_SECURE_STORE_KEY);
      const {
        data: {
          access,
          refresh,
        } = {},
      } = await client.post('auth/refresh', { refresh: refreshToken });
      await setCredentials(access, refresh);
      const authHeaders = await getAuthHeaders();
      const { headers } = error.config;
      return axios.request({
        ...error.config,
        headers: { ...headers, ...authHeaders },
      });
    } catch (err) {
      await removeCredentials();
    }
  }

  return Promise.reject(error);
});

export default client;
